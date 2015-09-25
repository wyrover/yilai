<template lang="jade">
main-nav(slug="{{slug}}")
.container
  .panel
    .panel-heading
      h3(v-text="event.id ? 'Edit event' : 'Add an event'")
    .panel-body
      .form-group
        input.form-control(type="text", placeholder="Event name", v-model="event.name", v-on="focus: onFocus, blur: onBlur")
      .form-group
        textarea.form-control(placeholder="Event description", rows="3", v-model="event.description", v-on="focus: onFocus, blur: onBlur")
      .form-group
        input.form-control(type="date", placeholder="Date", v-model="event.date", v-on="focus: onFocus, blur: onBlur")
      .form-actions
        button.btn.btn-primary.btn-block(v-on="click: storeEvent", v-class="btn-disabled: !submitable", v-attr="disabled: !submitable") Submit
        button.btn.btn-block(v-on="click: resetForm") Reset
  .list-group
    .alert.alert-null(v-if="!events.length") No events found. Add some through the left panel.
    .list-group-item(href="#", v-repeat="event in events")
      .list-group-item-heading
        h3(v-text="event.name")
        span(v-text="event.date")
      p.list-group-item-desc(v-text="event.description")
      button.btn.btn-xs(v-on="click: editEvent($index)") Edit
      button.btn.btn-xs.btn-danger(v-on="click: deleteEvent($index)") Delete
</template>

<script>
var MainNav = require('../components/main-nav.vue');

module.exports = {
  components: {
    'main-nav': MainNav
  },

  data: function () {
    return {
      slug: 'events',
      event: {name: '', description: '', date: ''},
      events: [],
      resource: null,
      submitable: false
    };
  },

  ready: function () {
    var dataUrl = __DEV__ ? 'http://localhost:3000/events/:id' : 'api/events';

    this.resource = this.$resource(dataUrl);

    // 获取数据
    this.fetchEvents();

    // 监听名称输入框改动以同步激活或禁用提交按钮
    this.$watch('event.name', function (val) {
      this.submitable = val === '' ? false : true;
    });
  },

  methods: {
    fetchEvents: function () {
      this.resource.get(function (data, status, request) {
        debug(data);
        this.$set('events', data);
      }).error(function (error, status, request) {
        debug(error);
      });
    },

    editEvent: function (index) {
      // debug(index);
      this.event = this.events[index];
    },

    storeEvent: function () {
      if (this.event.name) {
        if (this.event.id) {
          this.resource.update({id: this.event.id}, this.event, function (data, status, request) {
            debug(data);
            this.resetForm();
          }).error(function (data, status, request) {
            debug(data);
          });
        } else{
          this.resource.save(this.event, function (data, status, request) {
            debug(data);
            this.events.push(this.event);
            this.resetForm();
          }).error(function (error, status, request) {
            debug(error);
          });
        }
      }
    },

    deleteEvent: function (index) {
      if (confirm("Are you sure you want to delete this event?")) {
        this.resource.delete({id: this.events[index].id}, function (data, status, request) {
          debug(data);
          this.events.$remove(index);
        }).error(function (data, status, request) {
          debug(data);
        });
      }
    },

    resetForm: function () {
      this.event = {name: '', description: '', date: ''};
    },

    onFocus: function (e) {
      debug(e.target);
      e.target.classList.add("form-control--focus");
    },

    onBlur: function (e) {
      debug(e.target);
      e.target.classList.remove("form-control--focus");
    }

  }
};
</script>


<style lang="stylus">
// 通用配置
@import '../assets/stylus/common'

// 占位符
@import '../assets/stylus/placeholders'

.panel
  float left
  width 260px
  border 1px solid #E3E3E3

  .panel-heading
    background #F5F5F5
    border-bottom 1px solid #E3E3E3

    h3
      margin 0
      font-weight normal
      font-size 20px
      padding 10px 15px

  .panel-body
    padding 15px

    input[type="text"]
    input[type="date"]
    textarea
      box-sizing border-box
      line-height 24px
      font-size 14px
      padding 5px

    input[type="date"]
      padding 4px 5px

    textarea
      resize none

    .form-control
      display block
      width 100%
      border 1px solid #CCC

    .form-control--focus
      border-color blue

    .form-group
      margin-bottom 10px

    .form-actions
      clearfix()

      .btn
        float left
        width 48%
        margin-right 4%

        &:last-child
          margin-right 0

.list-group
  margin-left 280px
  border 1px solid #E3E3E3

  .list-group-item
    // display block
    border-bottom 1px solid #E3E3E3
    padding 15px
    font-size 14px
    color gray
    transition background .3s

    .list-group-item-heading
      h3
        margin 0
        font-size 16px
        font-weight normal
        color gray-darker

      span
        color gray-light
        font-size 12px

    p
      margin 5px 0

    .btn
      margin-right 5px

    &:hover
      background #F5F5F5

    &:last-child
      border none

</style>
