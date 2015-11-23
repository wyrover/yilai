<template lang="jade">
  .food-list
    .food-list-item(v-for="food in foods", track-by="$index", transition="staggered", stagger="100", @click.stop.prevent="handleClick(food, $event)")
      span {{food.name}}
      button.del(v-if="removable") 删除
</template>

<style lang="stylus">
  @import '../assets/stylus/common'

  /* 食材列表 */
  .food-list
    width 100%

    .food-list-item
      position relative
      size 100% rem(80)
      border-bottom 1px solid #999
      overflow hidden

      span
        absolute left top
        padding 0 5%
        size 100% rem(80)
        background #FFF
        box-sizing border-box
        line-height rem(80)
        z-index 2
        //transform translateX(rem(-88))

      .del
        absolute right top
        padding 0
        font-size rem(24)
        size rem(80)
        border none
        appearance none
        background red
        color #FFF
        z-index 1

      &.editing
        transform translateX(rem(-80))
</style>

<script>
  module.exports = {
    props: {
      'foods': {
        type: Array,
        default: []
      },
      'removable': {
        type: Boolean,
        default: false
      }
    },

    methods: {
      handleClick: function (food, evt) {
        if (this.removable) {
          evt.target.classList.add('editing');
        } else {
          this.$dispatch('food-click', food);
        }
      }
    }
  };
</script>