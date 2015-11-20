<template lang="jade">
  .food-list
    ul
      li(v-for="item in foods")
        a(v-link="item.id") {{item.name}}
        button 删除
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