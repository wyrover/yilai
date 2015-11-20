<template lang="jade">
.main-content.with-foot-actions
  .welcome
    p Hi~欢迎，在添加营养称前，
    p 确保您是否已经进行以下两个步骤

  .bluetooth-tip 请打开手机蓝牙

  .scale-tip 开启营养秤开关

  .foot-actions
    button.btn-block(type="button") 下一步

  //- modal
  //-   .modal-footer
  //-     button(@click="hide") 设置
  //-     button(@click="hide") 好
</template>

<style lang="stylus">
@import '../../shared/assets/stylus/common'
/* 欢迎词 */
.welcome
  font-size rem(16)
  text-align center

.bluetooth-tip
.scale-tip
  font-size rem(16)
  text-align center


</style>
<script>
var Modal = require('../../shared/components/modal.vue');
var appStore = require('../../shared/stores/app');
var locales = require('../../shared/consts/locales');

module.exports = {
  components: {
    'modal': Modal
  },

  data: function () {
    datas: []
  }
};
</script>
