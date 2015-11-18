<template lang="jade">
.main-content
  h1 设备列表
  .device-list
    a.device-actions-add(type="button") 新增
    .device-list-item(v-for="device in devices")
      span.thumb
      .info
        h3.name {{device.name}}
        span.mac {{device.mac}}
      button.unbind(type="button") 解绑
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
    fixed right 0 top 0
    display inline-block
    size rem(150) rem(70)
    text-align center
    background #f99
    border-top-left-radius rem(35)
    border-bottom-left-radius rem(35)

/* 设备列表项 */
  .device-list-item
    size 100% rem(200)
    background #fff
    border-bottom 1px solid #000
    clearfix()
    overflow hidden


/* 设备图片 */
    .thumb
      float left
      size 25% rem(200)
      background #999

/* 设备信息 */
    .info
      float left
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
      float left
      size rem(150)
      background #f00
      color #fff

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
            name: 'aa',
            mac: '1213rfadfadfa',
            binded: false
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
    }
  }
};
</script>