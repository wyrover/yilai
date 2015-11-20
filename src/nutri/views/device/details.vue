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
        button.trigger
        .dropdown-menu
          ul
            li
              a(v-link="{path: '/records'}")
            li
              a(v-link="{path: '/foods'}")

      //- 实时结果
      .result
        em.num
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

  .scale-dashboard
    background gray-light
    size 100% rem(460)
</style>

<script>
  module.exports = {

  };
</script>