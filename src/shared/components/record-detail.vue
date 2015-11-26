<template lang="jade">
  .nutri-record-con(v-for="item in records")
    .record-time(v-show="item.day === today")
      span.label Today
      span.line
    .record-time(v-show="item.day === yesterday")
      span.label  Yesterday
      span.line
    .record-time(v-show="item.day !== today && item.day !== yesterday")
      span.label {{item.day}}
      span.line
    ul.record-list
      li
        .record-item(@click="expand = !expand")
          span.time(v-text="item.time")
          span.detailData
            span.foodName(v-text="item.name")
            span.foodWeight {{item.weight}}g
            span.arrow(v-bind:class="{'expand' : expand}")
        .detail-block(v-show="expand", @click="test")
          span.detail
            | 热量
            em(v-text="item.heat")
            span.unit g
          span.detail
            | 蛋白质
            em(v-text="item.protein")
            span.unit g
          span.detail
            | 脂肪
            em(v-text="item.fat")
            span.unit g
          span.detail
            | 胆固醇
            em(v-text="item.chol")
            span.unit g
          span.detail
            | 糖类
            em(v-text="item.sugar")
            span.unit g
          span.detail
            | 纤维素
            em(v-text="item.fibrin")
            span.unit g
          span.detail
            | 钠
            em(v-text="item.natrium")
            span.unit g

</template>

<style lang="stylus">
  @import '../assets/stylus/common'

  .record-time
    color #FFF

    .label
      display inline-block
      size 20% rem(20)
      font-size rem(20)
      line-height rem(20)
      margin-right 5%
      text-align right

    .line
      display inline-block
      size 75% rem(4)
      border-top 1px solid #FFF
      margin-top rem(-15)

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

  .expand
    background url('../assets/images/bg/icon_topArrow.png') no-repeat center center
    background-size rem(24) rem(15)
</style>

<script>
  module.exports = {
    props: {
      'records': {
        type: Array,
        default: []
      },
      'expand': {
        type: Boolean,
        default: false
      }
    },

    data: function () {
      return {
        today: '',
        yesterday: ''
      }
    },

    computed: {
      today: function () {
        var date = new Date();
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      },
      yesterday: function () {
        var date = new Date();
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()-1);
      }
    },

    methods: {
      toggle: function (expandDetail) {
        return this.expandDetail = !expandDetail;
      },
      test: function () {
        console.log(this.today);
      }
    }
  }
</script>