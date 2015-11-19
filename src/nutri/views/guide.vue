<template lang="jade">
.main-content
  .welcome-words
    | Hi~欢迎，在添加营养称前，
    <br> 确保您是否已经进行以下两个步骤

  .switch
    img.switch-bluetooth
    .switch-tip 请打开手机蓝牙

  .switch
    img.switch-nutri
    .switch-tip 开启营养秤开关

  .actions
    button(type="button") 下一步

  //- modal
  //-   .modal-footer
  //-     button(@click="hide") 设置
  //-     button(@click="hide") 好
</template>

<style lang="stylus">
@import '../../shared/assets/stylus/common'
/* 欢迎词 */
.welcome-words
  font-size rem(16)
  text-align center

/* 开关 */
.switch
  width 100%
  text-align center

  img
    size 80% rem(200)

.switch-tip
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
