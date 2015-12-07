<template lang="jade">
  .main-content.with-foot-actions
    .userweight
      .current_weight
        .weight_time 测量时间 12.04 下午 14：38
        .weight_number
          | 73.2
          span.weight_unit kg
        .target_weight
          span.target_weight_span 目标
          span.target_weight_munber 75.5kg
      .chart
        a.chart_a(href="#")
      .setting
        a.setting_a(v-link="{path: '/setting'}")
      .current_bmi
        .bmi_colorstrip
        .bmi_pointer
          span BMI 24.1
          i.triangle

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
    height 320px
    margin 0 auto
    font-size rem(24)
    text-align center
    color #FFF
    overflow hidden

    .chart
      size rem(60) rem(60)
      absolute left rem(30) top rem(30)
      background-image url("../../assets/images/logo/chart.png")
      background-size 100% 100%
      background-position center center
      a.chart_a
        display block
        width 100%
        height 100%
        //background ("url(../../assets/images/logo/chart.png") no-repeat center center)

    .setting
      size rem(60) rem(60)
      background-image url("../../assets/images/logo/setting.png")
      background-size 100% 100%
      background-position center center
      absolute right rem(30) top rem(31)
      a.setting_a
        display block
        width 100%
        height 100%

    .current_weight
      width 100%
      height 220px
      position relative
      overflow hidden
      .weight_time
        width 100%
        font-size 0.7rem
        position absolute
        top 25px
        text-align center
      .weight_number
        width 100%
        height 90px
        line-height 90px
        margin 0 auto
        font-size 90px
        font-family import
        position absolute
        top 100px
        .weight_unit
          position absolute
          font-size 1.5rem
          line-height 1.5rem
          height 1.5rem
          bottom 0
          padding 10px
      .target_weight
        width 100%
        font-size 0.7rem
        position absolute
        top 200px
        text-align center
        font-size 0.7ren
        .target_weight_span
          margin-right 10px
    .current_bmi
      width 100%
      height 80px
      position relative
      margin 0 auto
      .bmi_colorstrip
        width 100%
        height 15px
        //border-radius 10px
        //background -webkit-gradient(linear, 0 0, 100% 0, from(green), to(red),color-stop(0.25,black),color-stop(0.75,blue))
        background-image url("../../assets/images/setiao.jpg")
        background-size 100% 100%
        position absolute
        top 50px
        left 50%
        transform translateX(-50%)
      .bmi_pointer
        height 35px
        position absolute
        left 25%
        font-size 0.8rem
        padding-top 15px
        text-overflow ellipsis
        transform translateX(-50%)
        .triangle
          width 0
          height 0
          border-left 6px solid transparent
          border-right 6px solid transparent
          border-bottom 6px solid #fff
          position absolute
          bottom 0
          left 50%
          transform translateX(-50%)
      .target_weight_span
        float left
      .target_weight_munber
        float right
  .constitutes
    width 100%
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
