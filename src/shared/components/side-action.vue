<template lang="jade">
  .side-actions(v-bind:class="{'side-actions-transform': !isShowSideAction}")
    button.btn-tragger(@click="showSideFn")
    slot
</template>

<style lang="stylus">
  @import '../../shared/assets/stylus/common'

  /* 右侧容器 */
  .side-actions
    fixed right top
    width rem(124)
    height rem(50)
    z-index 100
    transform translateX(rem(100))
    transition all .5s ease-out

  .btn-tragger
    float left
    size rem(24) rem(50)
    background url('../../shared/assets/images/bg/icon_guide.png') no-repeat 0 0
    background-size 100% 100%
    border none
    opacity 1

  .btn-actions
    float left
    size rem(100) rem(50)

    button
      float left
      padding 0
      margin-bottom rem(10)

  /* 右侧容器弹出类 */
  .side-actions-transform
    transform translateX(rem(24))

    .btn-tragger
      display none
      opacity 0
</style>

<script>
  module.exports = {
    props: {
      isShowSideAction: {
        type: Boolean,
        default: true,
        twoWay: true
      }
    },

    data: function () {
      return {
      }
    },

    methods: {
      showSideFn: function () {
        this.isShowSideAction = false;
        var self = this;
        var timer = setTimeout(function () {
          self.isShowSideAction = true;
        }, 3000);
      }
    }
  }
</script>