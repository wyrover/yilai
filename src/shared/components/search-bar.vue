<template lang="jade">
  .search-bar(:class="{'active': active}")
    .search-box
      input.search-input(placeholder="搜索", v-model="key", @focus="handleFocus(key)", @blur="handleBlur(key)", @input="handleInput(key)")
    button.btn-cancel(@click="handleCancelClick") 取消
</template>

<style lang="stylus">
  @import '../assets/stylus/common'

  .search-bar
    size 90% rem(80)
    padding rem(20) 5% rem(20) 5%
    background #f5f5f5
    overflow hidden

    .search-box
      position relative
      display inline-block
      width 100%
      height rem(80)
      padding 0 rem(80)
      border 1px solid #999
      border-radius rem(40)
      background #f5f5f5
      box-sizing border-box
      transition width .2s ease-in-out

      &::before
        absolute left .5rem top .5rem
        content ''
        size rem(40)
        background red

      .search-input
        padding 0
        size 100% rem(75)
        outline none
        border none
        font-size rem(30)

    .btn-cancel
      absolute right -20% top .5rem
      padding 0
      size 18% rem(80)
      font-size rem(30)
      border none
      background red
      transition right .2s ease-in-out
      outline none

    &.active
      .search-box
        width 80%

      .btn-cancel
        right 0
</style>

<script>
  module.exports = {
    props: {
      key: {
        type: String,
        default: ''
      },
      active: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      handleCancelClick: function () {
        this.$dispatch('cancel');
      },

      handleInput: function (key) {
        this.$dispatch('search', key);
      },

      handleFocus: function (key) {
        this.$dispatch('search-activate', key);
      },

      handleBlur: function (key) {
        this.$dispatch('search-deactivate', key);
      }
    }
  };
</script>