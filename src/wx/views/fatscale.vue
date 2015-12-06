<template lang="jade">
  .main-content.with-foot-actions
    .userweight
      .current_weight
        .weight_number
          | 73.2
          span.weight_unit kg
      .chart
        a(href="#") 图表
      .setting
        a(v-link="{path: '/setting'}") 设置
      .current_bmi
        .bmi_colorstrip
        .bmi_pointer
          | BMI 24.1
          i.triangle
      .target_weight
        span.target_weight_span 目标体重
        span.target_weight_munber 75.5kg
    .constitutes
      ul
        li.constitutes_li.fat
          .logo.fatlogo
          .text
            span.constitutes_title 脂肪
            span 34.1%
        li.constitutes_li.moisture
          .logo.moisturelogo
          .text
            span.constitutes_title 水分
            span 34.1%
        li.constitutes_li.bone
          .logo.bonelogo
          .text
            span.constitutes_title 骨骼
            span 34.1%
        li.constitutes_li.muscle
          .logo.musclelogo
          .text
            span.constitutes_title 肌肉
            span 34.1%


  //- modal
  //-   .modal-footer
  //-     button(@click="hide") 设置
  //-     button(@click="hide") 好
</template>

<style lang="stylus">
  @import '../../shared/assets/stylus/common'

  .userweight
    width 100%
    height 60%
    margin 0 auto
    font-size rem(24)
    text-align center
    color #FFF
    overflow hidden

    .chart
      size rem(80) rem(80)
      background #000
      absolute left rem(30) top rem(30)
      a
        display block
        width 100%
        height 100%
        //background (url(../../../assets/images/logo/chart.png) no-repeat center center)

    .setting
      size rem(80) rem(80)
      background #000
      absolute right rem(30) top rem(30)

    .current_weight
      width 100%
      height 60%
      position relative
      overflow hidden
      //position relative
      .weight_number
        width 100%
        height 80px
        line-height 80px
        margin 0 auto
        font-size 80px
        font-family import
        position absolute
        bottom 0
        .weight_unit
          position absolute
          font-size 1.5rem
          line-height 1.5rem
          height 1.5rem
          bottom 0
          padding 10px
    .current_bmi
      width 100%
      height 30%
      position relative
      overflow hidden
      .bmi_colorstrip
        width 260px
        height 20px
        border-radius 50px
        background -webkit-gradient(linear, 0 0, 100% 0, from(green), to(red),color-stop(0.25,black),color-stop(0.75,blue))
        position absolute
        top 20%
        left 50%
        transform translateX(-50%)
      .bmi_pointer
        position absolute
        top 20%
        left 50%
        margin-left -155px
        margin-top 25px
        padding-top 5px
        transform translateX(0px)
        .triangle
          width 0
          height 0
          border-left 6px solid transparent
          border-right 6px solid transparent
          border-bottom 6px solid #fff
          position absolute
          top 0
          left 50%
          transform translateX(-50%)

    .target_weight
      width 100%
      height 10%
      background rgba(0,0,0,0.5)
      position relative
      overflow hidden
      span
        display block
        height 100%
        vertical-align middle
        float left
        font-size 0.8rem
        padding 1.2% 10px
      .target_weight_span
        float left
      .target_weight_munber
        float right
  .constitutes
    width 100%
    height 60%
    ul
      padding 5px 0
      .constitutes_li
        display inline-block
        width 30%
        height 100px
        margin 0 1.5%
        padding 0
        position relative
        overflow hidden
        color #fff
        border 0
        .logo
          width 45px
          height 45px
          background red
          position absolute
          top 50%
          margin-top -22px
        .text
          height 60px
          float left
          position absolute
          left 48px
          top 50%
          margin-top -30px
          span
            font-size 16px
            line-height 30px
            display inherit
          .constitutes_title
            font-size 20px


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
