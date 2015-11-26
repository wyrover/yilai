<template lang="jade">
  .main-content.with-foot-actions
    //- 设备列表
    .device-list(v-if="filteredDevices.length")
      .device-list-item(v-for="device in filteredDevices", @click="$route.router.go('/devices/' + device.id)")
        .thumb
        .info
          h3.name {{device.name}}
          span.mac {{device.mac}}
        button.unbind(type="button", v-show="visibility==='binded'") 解绑
        button.bind(type="button", v-show="visibility==='unbinded'", @click="bindDevice(device, $event)") 绑定
    //- 无未绑定设备
    .tips-null(v-if="!filteredDevices.length")
      p 搜索不到未绑定的设备

    //- 右侧按钮
    .side-actions
      button.btn-side(v-show="visibility==='binded'", @click="setVisibility('unbinded')") 新增

    //- 底栏
    .foot-actions(v-if="visibility==='unbinded'")
      button.btn.btn-primary(@click="setVisibility('binded')") 取消
</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

  /* 右侧容器 */
  .side-actions
    fixed right top
    width rem(150)
    z-index 100

  /* 设备列表 */
  .device-list
    position relative
    width 100%
    border-top 1px solid #000

    /* 设备列表项 */
    .device-list-item
      position relative
      size 95% rem(142)
      margin-left 5%
      background #fff
      border-bottom 1px solid #FFF
      clearfix()
      //transform translateX(-4rem)

      &:first-child
        border-top 1px solid #FFF

      /* 设备图片 */
      .thumb
        display inline-block
        size 25% rem(142)
        background #999

      /* 设备信息 */
      .info
        absolute left 25% top
        size 75% rem(142)

        .name
          font-size rem(30)
          color #000
          font-weight bold
          margin 0

        .mac
          font-size rem(20)
          color #999
          margin 0

      /* 解绑按钮 */
      .unbind
        absolute left 100% top
        size 4rem rem(142)
        background #f00
        color #fff
        border none
        font-size rem(30)

      /* 绑定按钮 */
      .bind
        absolute right top
        size 4rem rem(142)
        background #f00
        color #fff
        border none
        font-size rem(30)

  /* 无捆绑设备 */
  .tips-null
    p
      margin 0
</style>

<script>
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
    // 视图初始化数据
    data: function () {
      return {
        devices: [],
        visibility: 'binded'
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
      }
    }
  };
</script>