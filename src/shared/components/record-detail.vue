<template lang="jade">
  .nutri-record-con(v-for="item in records")
    div
      .record-time
        span.label {{item.day}}
        span.line
      record-list(:time="item.time", :name="item.name", :weight="item.weight", :heat="item.heat", :protein="item.protein", :fat="item.fat", :chol="item.chol", :sugar="item.sugar", :fibrin="item.fibrin", :natrium="item.natrium")

</template>

<style lang="stylus">
  @import '../assets/stylus/common'

  .record-time
    color #FFF

    .label
      display inline-block
      size 20% rem(20)
      font-size rem(20)
      line-height rem(20)
      margin-right 5%
      text-align right

    .line
      display inline-block
      size 75% rem(4)
      border-top 1px solid #FFF
      margin-top rem(-15)

</style>

<script>
  var recordList = require('../../shared/components/record-list.vue');
  module.exports = {
    components: {
      'record-list': recordList
    },

    props: {
      'records': {
        type: Array,
        default: []
      },
      'expand': {
        type: Boolean,
        default: false
      }
    },

    data: function () {
      return {
        today: '',
        yesterday: ''
      }
    },

    computed: {
      today: function () {
        var date = new Date();
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      },
      yesterday: function () {
        var date = new Date();
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()-1);
      },
      returnJudgedDate: function (val) {
        return val+'s';
      }
    },

    methods: {
      toggle: function (expandDetail) {
        return this.expandDetail = !expandDetail;
      }
    }
  }
</script>