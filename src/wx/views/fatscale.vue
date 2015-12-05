<template lang="jade">
  .main-content.with-foot-actions
    .userweight
      .chart 图表
      .setting 设置
      .current_weight 当前体重
        .weight_number 73.2
      .current_bmi 当前bmi
      .target_weight 目标体重
    .constitutes
      ul
        li.constitutes_li.fat
        li.constitutes_li.water
        li.constitutes_li.bone
        li.constitutes_li.muscle


  //- modal
  //-   .modal-footer
  //-     button(@click="hide") 设置
  //-     button(@click="hide") 好
</template>

<style lang="stylus">
  @import '../../shared/assets/stylus/common'

  /* 欢迎词 */
  .userweight
    width 100%
    height 60%
    margin 0 auto
    font-size rem(24)
    text-align center
    color #FFF
    background #000
    overflow hidden

    .chart
      size rem(80) rem(80)
      background #000
      absolute left rem(30) top rem(30)

    .setting
      size rem(80) rem(80)
      background #000
      absolute right rem(30) top rem(30)

    .current_weight
      width 100%
      height 60%
      background red
      overflow hidden
      .weight_number
        width 100%
        height 80px
        line-height 80px
        margin 20% auto
        font-size 80px
        font-family import
    .current_bmi
      width 100%
      height 30%
      background green
    .target_weight
      width 100%
      height 10%
      background red
  .constitutes
    width 100%
    height 60%
    ul
      padding 5px 0
      .constitutes_li
        display inline-block
        width 30%
        height 110px
        margin 0 1.6%
        padding 0
        background blue

</style>

<script>
  var Modal = require('../../shared/components/modal.vue');

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
