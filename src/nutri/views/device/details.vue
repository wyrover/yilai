<template lang="jade">
  .main-content.with-foot-actions
    //- 营养称仪表界面
    .scale-dashboard
      //- 蓝牙状态
      .bluetooth-status 已连接

      //- 历史纪录
      a.link-records(v-link="{path: '/records'}")

      //- 更多设置
      .more-settings
        button.trigger(@click="showMenu=!showMenu", @blur="showMenu=false")
        .dropdown-menu(v-show="showMenu")
          ul
            li(@touchstart="redirectTo('/devices')") 设备
            li(@touchstart="redirectTo('/foods')") 个人食材

      //- 实时结果
      .result
        em.num 90
        span.unit g

      //- 表盘
      .meter
        .scale-mark
        .cursor

    //- 食材选择
    .food-select
      a(v-link="{path: '/foods/select'}") 白面包

    //- 食材营养列表
    .nutri-list
      ul
        li.icon-heat
          .label 热量
          .value
            em.num 34.01
            span.unit kcal
        li.icon-protein
          .label 蛋白质
          .value
            em.num 804.01
            span.unit g
        li.icon-fat
          .label 脂肪
          .value
            em.num 104.01
            span.unit g
        li.icon-chol
          .label 胆固醇
          .value
            em.num 64.01
            span.unit mg
        li.icon-sugar
          .label 糖类
          .value
            em.num 14.01
            span.unit g
        li.icon-fibrin
          .label 纤维素
          .value
            em.num 84.01
            span.unit g
        li.icon-natrium
          .label 钠
          .value
            em.num 30.01
            span.unit mg

    //- 操作
    .foot-actions
      button.btn-block(type="button") 保存
</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

  //- 营养称仪表界面
  .scale-dashboard
    background gray-light
    size 100% rem(460)
    overflow hidden
    position relative
    border-bottom 1px solid #DDD

    //- 蓝牙状态
    .bluetooth-status
      absolute left 25% top rem(10)
      width 50%
      text-align center
      font-size rem(28)

    //- 历史纪录
    .link-records
      absolute left rem(10) top rem(10)
      size rem(60)
      background red

    //- 更多设置
    .more-settings
      absolute right rem(10) top rem(10)
      size rem(60)
      z-index 1

      .trigger
        size rem(60)
        background red
        border none
        appearance none
        outline none

      .dropdown-menu
        absolute right top rem(60)
        width rem(160)
        background #FFF
        font-size rem(28)

        li
          padding rem(10) rem(20)

    //- 实时结果
    .result
      absolute left 25% top rem(50)
      width 50%
      text-align center

      .num
        font-size rem(90)

      .unit
        font-size rem(28)

    //- 表盘
    .meter
      absolute left 50% bottom rem(-250)
      size rem(500)
      margin-left rem(-250)

      .scale-mark
        absolute left top
        size rem(500)
        background #FFF
        border-radius rem(300)

      .cursor
        absolute left 50% top
        margin-left rem(-10)
        background red
        size rem(20) rem(250)

  //- 食材选择
  .food-select
    border-bottom 1px solid #DDD

    a
      display block
      font-size rem(28)
      text-align center
      line-height rem(80)

  // 食材营养列表
  .nutri-list
    ul
      font-size 0

    li
      display inline-block
      font-size rem(28)
      width 33.3%
      padding rem(30) rem(10) rem(30) rem(80)
      box-sizing border-box
</style>

<script>
  module.exports = {
    data: function () {
      return {
        showMenu: false
      }
    },

    methods: {
      redirectTo: function (url) {
        this.$route.router.go(url);
      }
    }
  };
</script>