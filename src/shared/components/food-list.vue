<template lang="jade">
  .food-list
    .food-list-item.editing(v-for="food in foods", track-by="$index",  stagger="100")
      span(@click="handleClick(food, $event)") {{food.name}}
      button.del(v-if="removable") DELETE
</template>

<style lang="stylus">
  @import '../assets/stylus/common'

  /* 食材列表 */
  .food-list
    width 100%
    border-bottom 1px solid #FFF
    border-top 1px solid #FFF

    .food-list-item
      position relative
      size 90% rem(108)
      margin-left 10%
      border-top 1px solid #FFF
      //transform translateX(rem(-110))

      &:first-child
        border-top none

      span
        absolute left top
        padding 0 5%
        size 100% rem(108)
        box-sizing border-box
        line-height rem(108)
        z-index 2
        color #FFF
        font-size rem(30)
        background url('../../shared/assets/images/bg/icon_rightArrow.png') no-repeat right rem(50) center
        background-size rem(16) rem(25)


      .del
        absolute right rem(-110) top
        padding 0
        font-size rem(24)
        size rem(110) rem(110)
        border none
        appearance none
        background red
        color #FFF
        text-align center
        z-index 3
        border-bottom rem(2) solid #FFF
        border-left 1px solid #FFF
        box-sizing border-box
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