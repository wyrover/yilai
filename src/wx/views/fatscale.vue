<template lang="jade">
  .main-content.with-foot-actions
    .userweight
      .current_weight
        .weight_time
          span.time_num.day_date{{closestState.date.split(" ")[0].split("-")[1]}}-{{closestState.date.split(" ")[0].split("-")[2]}}
          span.time_num.time_date{{closestState.date.split(" ")[1].slice(0,5)}}
        .weight_number
          | {{closestState.weight}}
          span.weight_unit kg
        .target_weight
          span.target_weight_span 目标
          span.target_weight_munber 75.5kg
      .chart
        a.chart_a(v-link="{path: '/chart'}")
      .setting
        a.setting_a(v-link="{path: '/setting'}")
      .current_bmi
        .bmi_colorstrip

        .bmi_pointer(v-if="closestState.bmi>0&closestState.bmi<18.5",v-bind:style="{left:closestState.bmi*2+'%'}")
          span(v-bind:style="{color:bmicolor.color1}") BMI {{closestState.bmi}} 过轻
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color1}")
        .bmi_pointer(v-if="closestState.bmi>=18.5&&closestState.bmi<=24.99",v-bind:style="{left:closestState.bmi*2+'%'}")
          span(v-bind:style="{color:bmicolor.color2}") BMI {{closestState.bmi}} 正常
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color2}")
        .bmi_pointer(v-if="closestState.bmi>24.99&&closestState.bmi<=32",v-bind:style="{left:closestState.bmi*2+'%'}")
          span(v-bind:style="{color:bmicolor.color3}") BMI {{closestState.bmi}} 过重
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color3}")
        .bmi_pointer(v-if="closestState.bmi>32&&closestState.bmi<=42.5",v-bind:style="{left:closestState.bmi*2+'%'}")
          span(v-bind:style="{color:bmicolor.color4}") BMI {{closestState.bmi}} 肥胖
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color4}")
        .bmi_pointer(v-if="closestState.bmi>43",v-bind:style="{left:'85%'}")
          span(v-bind:style="{color:bmicolor.color4}") BMI {{closestState.bmi}} 肥胖
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color4}")

    .constitutes
      ul
        li.constitutes_li.fat
          .logo.fatlogo
          .text
            span.constitutes_title 脂肪率
            span {{closestState.fat}}%
        li.constitutes_li.moisture
          .logo.moisturelogo
          .text
            span.constitutes_title 水分率
            span {{closestState.moisture}}%
        li.constitutes_li.bone
          .logo.bonelogo
          .text
            span.constitutes_title 骨量
            span {{closestState.bone}}%
        li.constitutes_li.muscle
          .logo.musclelogo
          .text
            span.constitutes_title 肌肉率
            span {{closestState.muscle}}%
        li.constitutes_li.organs_li
          .logo.organslogo
          .text
            span.constitutes_title 内脏脂肪
            span ??%
        li.constitutes_li.internalage_li
          .logo.internalagelogo
          .text
            span.constitutes_title 体内年龄
            span ??岁
        li.constitutes_li.basal_metabolism_li
          .logo.basal_metabolism_logo
          .text
            span.constitutes_title 基础代谢
            span {{closestState.metabolism}}%

  //- modal
  //-   .modal-footer
  //-     button(@click="hide") 设置
  //-     button(@click="hide") 好
</template>

<style lang="stylus">
  @import '../../shared/assets/stylus/common'

  .userweight
    width 100%
    height 275px
    margin 0 auto
    font-size rem(24)
    text-align center
    color #FFF
    overflow hidden

    .chart
      size rem(60) rem(60)
      absolute left rem(30) top rem(50)
      background-image url("../assets/images/logo/chart.png")
      background-size 100% 100%
      background-position center center
      a.chart_a
        display block
        width 100%
        height 100%
        //background ("url(../../assets/images/logo/chart.png") no-repeat center center)

    .setting
      size rem(60) rem(60)
      background-image url("../assets/images/logo/setting.png")
      background-size 100% 100%
      background-position center center
      absolute right rem(30) top rem(51)
      a.setting_a
        display block
        width 100%
        height 100%

    .current_weight
      width 100%
      height 212px
      position relative
      overflow hidden
      .weight_time
        width 100%
        font-size 0.7rem
        position absolute
        top 30px
        text-align center
        .time_num
          padding 0 3px
      .weight_number
        text-shadow 2px 2px rgba(0,0,0,0.3)
        width 100%
        height 120px
        line-height 120px
        margin 0 auto
        font-size 95px
        font-family Impact,Euphemia
        position absolute
        top 70px
        .weight_unit
          text-shadow 1px 1px rgba(0,0,0,0.1)
          position absolute
          font-size 1rem
          line-height 1.5rem
          height 1.5rem
          bottom 5px
          padding 10px 5px
          font-family 'Microsoft YaHei'
      .target_weight
        width 100%
        font-size 0.65rem
        position absolute
        top 190px
        text-align center
        font-size 0.7ren
        .target_weight_span
          margin-right 10px
    .current_bmi
      width 100%
      height 60px
      position relative
      margin 0 auto
      .bmi_colorstrip
        width 100%
        height 10px
        //border-radius 10px
        background -webkit-gradient(linear, 0 0, 100% 0, from(#8cfeff), to(#ff9d9c),color-stop(0.48,#91fea1),color-stop(0.55,#ffe286))
        //background-image url("../assets/images/setiao.jpg")
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
        color red
        .triangle
          width 0
          height 0
          border-left 6px solid transparent
          border-right 6px solid transparent
          border-top 6px solid #fff //随着数值变化跟着变化颜色
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
        height 70px
        margin 0 1.5%
        padding 0
        position relative
        overflow hidden
        color #fff
        border 0
        .logo
          width 30px
          height 30px
          position absolute
          top 50%
          margin-top -10px
          background-size 100% 100%
        .fatlogo
          background-image url("../assets/images/logo/zhifang.png")
        .moisturelogo
          background-image url("../assets/images/logo/shuifen.png")
        .bonelogo
          background-image url("../assets/images/logo/guge.png")
        .musclelogo
          background-image url("../assets/images/logo/jirou.png")
        .weightlogo
          background-image url("../assets/images/logo/tizhong.png")
        .bmilogo
          background-image url("../assets/images/logo/BMI.png")
        .organslogo
          background-image url("../assets/images/logo/neizang.png")
        .internalagelogo
          background-image url("../assets/images/logo/tineinianling.png")
        .basal_metabolism_logo
          background-image url("../assets/images/logo/jichudaixie.png")
        .text
          height 60px
          float left
          position absolute
          left 33px
          top 50%
          margin-top -20px
          span
            font-size 16px
            line-height 25px
            display inherit
          .constitutes_title
            font-size 14px


</style>

<script>
  var Modal = require('../../shared/components/modal.vue');

  module.exports = {
    components: {
      'modal': Modal
    },

    data: function () {
      return {
        'bmicolor':{
          "color1":"#8cfeff",
          "color2":"#91fea1",
          "color3":"#ffe286",
          "color4":"#ff9d9c"
        },
        closestState:{
          "date":"2015-11-11 12:00:00",
          "age":30,
          "height":178,
          "weight":80.12,
          "bmi":35,
          "fat":10,
          "moisture":11,
          "muscle":12,
          "bone":13,
          "metabolism":14
        }
      };
    }
  };
</script>
