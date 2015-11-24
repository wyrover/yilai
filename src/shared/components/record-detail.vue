<template lang="jade">
  .nutri-record-con(v-for="item in records")
    .record-time(v-show="item.day === today") 今天
    .record-time(v-show="item.day === yesterday") 昨天
    .record-time(v-show="item.day !== today && item.day !== yesterday") {{item.day}}
    ul.record-list
      li
        .record-item(@click="expand = !expand")
          span.time(v-text="item.time")
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
    text-align center
    background #c0c0c0

  // 列表项
  .record-list
    width 100%

    .record-item
      width 90%
      padding 0 5%
      border-bottom 1px solid #999

    .time
      display inline-block
      width 25%

    .foodName
      display inline-block
      width 40%

    .foodWeight
      display inline-block
      width 20%

    .detail-block
      width 90%
      padding 0 5%
      border-bottom 1px solid #999

      .detail
        display inline-block
        width rem(190)
        font-size rem(30)

  // 箭头ICON
  .arrow
    display inline-block
    size rem(30)
    background #000

  .expand
    background #f00
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