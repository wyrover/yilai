<template lang="jade">
  ul.food-list
    li(v-for="item in foods")
      a(v-link="item.id") {{item.name}}
      button 删除
  slot
    .none-search-result(v-show="canSee")
      .tip-none-result 暂未搜索结果!
      a(href="#") 立即添加食材>
</template>

<style lang="stylus">
  @import '../assets/stylus/common'

  /* 食材列表 */
  .food-list
    width 100%

    li
      width 100%
      //transform translateX(-4rem)

      a
        display inline-block
        size 90% rem(80)
        line-height rem(80)
        padding 0 5%
        border-bottom 1px solid #999
        background #fff

      button
        absolute right -4rem top
        size 4rem rem(80)
</style>

<script>
module.exports = {
  props: {
    'foods': {
      type: Array,
      default: []
    }
  }
};
</script>