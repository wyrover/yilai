<template lang="jade">
  .main-content.with-foot-actions
    .welcome
      p Hi~Before adding the nutrition scale,
      p Make sure you have the following two steps.

    .bluetooth-tip
      span Please turn on the bluetooth!

    .scale-tip
      span Turn on the nutrition scale switch!

    .foot-actions
      button.btn.btn-primary Next

  //- modal
  //-   .modal-footer
  //-     button(@click="hide") 设置
  //-     button(@click="hide") 好
</template>

<style lang="stylus">
  @import '../../shared/assets/stylus/common'

  /* 欢迎词 */
  .welcome
    width 85%
    margin 0 auto
    font-size rem(24)
    text-align center
    color #FFF
    padding rem(45) 0

    &::before
      size rem(50) rem(2)
      background #FFF
      absolute left rem(20) top rem(70)
      content ''

    &::after
      size rem(50) rem(2)
      background #FFF
      absolute right rem(20) top rem(70)
      content ''

    p
      margin 0
      padding 0
      font-size rem(20)

  .bluetooth-tip
    padding-top rem(170)
    text-align center
    background url('../../shared/assets/images/blue-tooth.png') no-repeat center top
    background-size rem(278) rem(150)
    margin-top rem(60)


  .scale-tip
    padding-top rem(150)
    text-align center
    background url('../../shared/assets/images/scale-swtich.png') no-repeat center top
    background-size rem(130) rem(130)
    margin-top rem(100)

  .bluetooth-tip
  .scale-tip
    span
      display inline-block
      color #FFF
      font-size rem(30)
      padding rem(10) rem(20)
      text-align left
      border 1px solid #FFF
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
      return {

      };
    }
  };
</script>
