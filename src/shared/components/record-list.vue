<template lang="jade">
     ul.record-list
      li
        .record-item(@click="expandTriggle = !expandTriggle")
          span.time(v-text="time")
          span.detailData
            span.foodName(v-text="name")
            span.foodWeight {{weight}}g
            span.arrow(v-bind:class="{'expandDetailInfo' : expandTriggle}")
        .detail-block(v-show="expandTriggle")
          span.detail
            | 热量
            em(v-text="heat")
            span.unit g
          span.detail
            | 蛋白质
            em(v-text="protein")
            span.unit g
          span.detail
            | 脂肪
            em(v-text="fat")
            span.unit g
          span.detail
            | 胆固醇
            em(v-text="chol")
            span.unit g
          span.detail
            | 糖类
            em(v-text="sugar")
            span.unit g
          span.detail
            | 纤维素
            em(v-text="fibrin")
            span.unit g
          span.detail
            | 钠
            em(v-text="natrium")
            span.unit g
</template>

<style lang="stylus">
  @import '../assets/stylus/common'

    // 列表项
  .record-list
    width 100%
    color #FFF

    li
      line-height rem(40)

    .record-item
      width 100%
      font-size rem(30)

    .time
      display inline-block
      width 20%
      margin-right 5%
      text-align right

    .detailData
      display inline-block
      width 70%
      padding-right 5%
      padding-top rem(15)
      padding-bottom rem(10)

    .foodName
      display inline-block
      width 68%
      margin-left 5%

    .foodWeight
      display inline-block
      width 20%

    .detail-block
      width 70%
      margin-left 25%

      .detail
        display inline-block
        padding-left 5%
        font-size rem(18)

        em
          margin-left rem(5)

  // 箭头ICON
  .arrow
    display inline-block
    size rem(24)
    background url('../assets/images/bg/icon_rightArrow.png') no-repeat center center
    background-size rem(15) rem(24)

  .expandDetailInfo
    background url('../assets/images/bg/icon_topArrow.png') no-repeat center center
    background-size rem(24) rem(15)
</style>

<script>
  module.exports = {
    props: {
      time: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      weight: {
        type: Number,
        default: 0
      },
      heat: {
        type: Number,
        default: 0
      },
      protein: {
        type: Number,
        default: 0
      },
      fat: {
        type: Number,
        default: 0
      },
      chol: {
        type: Number,
        default: 0
      },
      sugar: {
        type: Number,
        default: 0
      },
      fibrin: {
        type: Number,
        default: 0
      },
      natrium: {
        type: Number,
        default: 0
      }
    },

    data: function () {
      return {
        expandTriggle: false
      };
    }
  }
</script>