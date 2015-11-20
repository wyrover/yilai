<template lang="jade">
.main-content
  .device-list
    .device-actions-add(v-show="!adding", v-on:click="this.adding = !this.adding") 新增
    .device-list-item(v-for="device in devices | filterBy !adding in 'binded'")
      span.thumb
      .info
        h3.name {{device.name}}
        span.mac {{device.mac}}
      button.unbind(type="button", v-show="!adding") 解绑
      button.bind(type="button", v-show="adding", v-on:click="bindDevice(device)") 绑定
</template>

<style lang="stylus">
@import '../../../shared/assets/stylus/common'

/* 设备列表 */
.device-list
  position relative
  width 100%
  border-top 1px solid #000

  /* 设备新增按钮 */
  .device-actions-add
    fixed right top
    display inline-block
    size rem(150) rem(70)
    text-align center
    background #f99
    z-index 999
    border-top-left-radius rem(35)
    border-bottom-left-radius rem(35)

  /* 设备列表项 */
  .device-list-item
    position relative
    size 100% rem(200)
    background #fff
    border-bottom 1px solid #000
    clearfix()
    //transform translateX(-4rem)


    /* 设备图片 */
    .thumb
      display inline-block
      size 25% rem(200)
      background #999

    /* 设备信息 */
    .info
      absolute left 25% top
      size 75% rem(200)

      .name
        font-size rem(36)
        color #000
        font-weight bold

      .mac
        font-size rem(16)
        color #999

    /* 解绑按钮 */
    .unbind
      absolute left 100% top
      size 4rem rem(200)
      background #f00
      color #fff
      border none

    /* 绑定按钮 */
    .bind
      absolute right top
      size 4rem rem(200)
      background #f00
      color #fff
      border none
</style>

<script>
var Promise = require('promise');
var Modal = require('../../../shared/components/modal.vue');
var appStore = require('../../../shared/stores/app');
var locales = require('../../../shared/consts/locales');

module.exports = {
  // 组件
  components: {
    'modal': Modal
  },

  // 视图初始化数据
  data: function () {
    return {
      devices: [],
      adding: false
    };
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
      if (__DEBUG__) {
        return new Promise(function (resolve, reject) {
          resolve([{
            name: 'AA',
            mac: '1213rfadfadfa',
            binded: true
          }, {
            name: 'bbb',
            mac: '1213rfadfadfaasdfsdfasd',
            binded: false
          }]);
        });
      }
      return Promise.resolve($.ajax({
        url: '',
        type: 'get'
      }));
    },
    bindDevice: function (device) {
      this.adding = !this.adding;
      this.device = device;
      device.binded = true;
    }
  }
};
</script>