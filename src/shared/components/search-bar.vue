<template lang="jade">
  .search-bar(:class="{'active': active}")
    .search-box
      input.search-input(v-model="key", @focus="handleFocus(key)", @blur="handleBlur(key)", @input="handleInput(key)")
    button.btn-cancel(@click="handleCancelClick") 取消
</template>

<style lang="stylus">
  @import '../assets/stylus/common'

  .search-bar
    size rem(524) rem(74)
    margin 0 auto
    padding rem(20) 0 rem(20) 0
    overflow hidden

    .search-box
      position relative
      display inline-block
      width 100%
      height rem(80)
      padding 0 rem(80)
      border rem(4) solid #FFF
      border-radius rem(40)
      box-sizing border-box
      transition width .2s ease-in-out

      &::before
        absolute left .5rem top .2rem
        content ''
        size rem(46) rem(50)
        background url('../assets/images/bg/icon_search.png') no-repeat 0 0
        background-size rem(46) rem(50)

      .search-input
        padding 0
        size 100% rem(70)
        outline none
        border none
        font-size rem(30)
        background transparent
        color #fff

    .btn-cancel
      absolute right -20% top .5rem
      padding 0
      size 18% rem(80)
      font-size rem(30)
      border none
      transition right .2s ease-in-out
      outline none
      background transparent
      text-align left
      color #FFF

    &.active
      .search-box
        width rem(440)

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