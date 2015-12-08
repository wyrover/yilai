<template lang="jade">
  .main-content.chart_page
    .date_switch
      .fir_datetype
        .datetype_box.week 周
        .datetype_box.month.selected 月
        .datetype_box.year 年
      .sed_datetype
        i.pointer_left &lt;
        |10月15日~18日
        i.pointer_right &gt;
      .chart_box
        .chart_canvas
          |画布
        .coordinate
          |坐标
    .type_switch
      ul.type_switch_ul
        li.date_type.weight 体重
        li.date_type.bmi BMI
        li.date_type.fat 脂肪率


</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

  .chart_page
    width 100%
    height 100%
    overflow hidden
    font-size 16px
    color #fff
    .date_switch
      width 100%
      position relative
      .fir_datetype
        width 93%
        height 40px
        margin 0 auto
        line-height 40px
        .datetype_box
          margin-top 6px
          display inline-block
          width 32.5%
          height 28px
          line-height 26px
          background transparent
          text-align center
          border 1px solid #fff
        .week
          border-radius 5px 0 0 5px
        .year
          border-radius 0 5px 5px 0
        .selected
          background #fff
          color #03b1c4
      .sed_datetype
        width auto
        height 30px
        line-height 30px
        position relative
        margin 8px auto
        padding 0 15px
        text-align center
        i
          display inline-block
          width 30px
          height 30px
          margin 0 10px
      .chart_box
        width 100%
        height 252px
        overflow hidden
        .chart_canvas
          width 100%
          height 220px
          background red
        .coordinate
          width 100%
          height 30px
          border-top 1px solid #fff
          border-bottom 1px solid #fff




</style>
