<template lang="jade">
  .main-content.with-foot-actions
    //- 设备列表
    .device-list(v-if="filteredDevices.length")
      .device-list-item(v-for="device in filteredDevices", @click="$route.router.go('/devices/' + device.id)")
        .info
          h3.name {{device.name}}
          span.mac {{device.mac}}
        button.unbind(type="button") UNBIND
        button.btn.btn-secondary.bind(type="button", v-show="visibility==='unbinded'", @click="bindDevice(device, $event)") 绑定
    //- 无未绑定设备
    .tips-null(v-if="!filteredDevices.length")
      p 搜索不到未绑定的设备

    //- 右侧按钮
    side-action(:isShowSideAction="false")
      div.btn-actions
        button.btn-side.btn-add ADD

    //- 底栏
    .foot-actions(v-if="visibility==='unbinded'")
      button.btn.btn-primary(@click="setVisibility('binded')") 取消
</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

  /* 设备列表 */
  .device-list
    position relative
    width 100%
    border-top 1px solid #000

    /* 设备列表项 */
    .device-list-item
      position relative
      width 90%
      margin-left 5%
      padding-right 5%
      border-bottom 1px solid #FFF
      clearfix()
      //transform translateX(rem(-150))

      &:first-child
        border-top 1px solid #FFF

      /* 设备图片 */
      .thumb
        display inline-block
        size rem(100) rem(142)

      /* 设备信息 */
      .info
        margin rem(22) 0
        display inline-block
        padding-left rem(100)
        background url('../../../shared/assets/images/bg/icon_device.png') no-repeat left center
        background-size rem(50)

        .name
          font-size rem(30)
          color #FFF
          font-weight bold
          margin 0

        .mac
          font-size rem(20)
          color #FFF
          margin 0

      /* 解绑按钮 */
      .unbind
        absolute left 100% top
        size rem(150)
        background #fd3830
        font-size rem(30)
        border 1px solid #FFF
        border-top none
        padding 0
        color #FFF

        &:first-child
          background #000

      /* 绑定按钮 */
      .bind
        absolute right 5% top 50%
        color #fff
        font-size rem(30)
        margin-top rem(-25)

  /* 无捆绑设备 */
  .tips-null
    p
      margin 0

</style>

<script>
  var sideAction = require('../../../shared/components/side-action.vue')
  var Promise = require('promise');
  var filters = {
    all: function (devices) {
      return devices;
    },

    binded: function (devices) {
      return devices.filter(function (device) {
        return device.binded === true;
      })
    },

    unbinded: function (devices) {
      return devices.filter(function (device) {
        return device.binded === false;
      })
    }
  };

  module.exports = {
    components: {
      'side-action': sideAction
    },

    // 视图初始化数据
    data: function () {
      return {
        devices: [],
        visibility: 'binded',
        isShowSideAction: false
      };
    },

    computed: {
      filteredDevices: function () {
        return filters[this.visibility](this.devices);
      }
    },

    route: {
      data: function (transition) {
        return {
          devices: this.fetchDevices()
        }
      }
    },

    ready: function () {

    },

    methods: {
      fetchDevices: function () {
        var self = this;

        if (__DEBUG__) {
          return new Promise(function (resolve, reject) {
            self.$http.get('http://localhost:9090/devices', function (data, status, request) {
              resolve(data);
            }).error(function  (data, status, request) {
              reject(data);
            });/*
            resolve([{
              id: 1,
              name: 'AA',
              mac: '1213rfadfadfa',
              binded: true
            }, {
              id: 2,
              name: 'bbb',
              mac: '1213rfadfadfaasdfsdfasd',
              binded: false
            }]);*/
          });
        }
        return Promise.resolve($.ajax({
          url: '',
          type: 'get'
        }));
      },

      setVisibility: function (visibility) {
        this.visibility = visibility;
      },

      bindDevice: function (device, event) {
        // 阻止点击事件冒泡
        event.stopPropagation();
        device.binded = true;
        this.setVisibility('binded');
        this.$http.get('http://localhost:9090/devices', function (data, status, request) {
          console.log(data);
        }).error(function  (data, status, request) {
        });
      },

      test: function () {
        this.isShow =true;
        var self = this;
        var timer = setTimeout(function () {
          self.isShow = false;
        }, 3000);
      }
    }
  };
</script>