<template lang="jade">
  .main-content.with-foot-actions
    //- 营养称仪表界面
    .scale-dashboard
      //- 蓝牙状态
      .bluetooth-status
        span(v-if="state.status==='disconnected'") 未连接
        span(v-if="state.status==='connecting'") 连接中
        span(v-if="state.status==='connected'") 已连接

      //- 历史纪录
      a.link-records(v-link="{path: '/records'}")

      //- 更多设置
      .more-settings(:class="{'open':showMenu}")
        button.trigger(@click="toggleDropdown", @blur="closeDropdown")
        .dropdown-menu
          ul
            li(@mousedown="redirectTo('/devices', $event)") 设备
            li(@mousedown="redirectTo('/foods', $event)") 个人食材

      //- 实时结果
      .result
        em.num {{state.weight}}
        span.unit g

      //- 表盘
      .meter
        .scale-mark
        .cursor

    //- 食材选择
    .food-select
      a(v-link="{path: '/foods/select'}", v-text="state.food.name || '选择食材'")

    //- 食材营养列表
    .nutri-list
      ul
        li.icon-heat
          .label 热量
          .value
            em.num(v-text="record.heat")
            span.unit kcal
        li.icon-protein
          .label 蛋白质
          .value
            em.num(v-text="record.protein")
            span.unit g
        li.icon-fat
          .label 脂肪
          .value
            em.num(v-text="record.fat")
            span.unit g
        li.icon-chol
          .label 胆固醇
          .value
            em.num(v-text="record.chol")
            span.unit mg
        li.icon-sugar
          .label 糖类
          .value
            em.num(v-text="record.sugar")
            span.unit g
        li.icon-fibrin
          .label 纤维素
          .value
            em.num(v-text="record.fibrin")
            span.unit g
        li.icon-natrium
          .label 钠
          .value
            em.num(v-text="record.natrium")
            span.unit mg

    //- 操作
    .foot-actions
      button.btn.btn-block(@click="saveRecord") 保存
</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

  //- 营养称仪表界面
  .scale-dashboard
    background gray-light
    size 100% rem(460)
    overflow hidden
    position relative
    border-bottom 1px solid #DDD

    //- 蓝牙状态
    .bluetooth-status
      absolute left 25% top rem(10)
      width 50%
      text-align center
      font-size rem(28)

    //- 历史纪录
    .link-records
      absolute left rem(10) top rem(10)
      size rem(60)
      background red

    //- 更多设置
    .more-settings
      absolute right rem(10) top rem(10)
      size rem(60)
      z-index 1

      .trigger
        size rem(60)
        background red
        border none
        appearance none
        outline none

      .dropdown-menu
        display none
        absolute right top rem(60)
        width rem(160)
        background #FFF
        font-size rem(28)

        li
          padding rem(10) rem(20)

      &.open
        .dropdown-menu
          display block

    //- 实时结果
    .result
      absolute left 25% top rem(50)
      width 50%
      text-align center

      .num
        font-size rem(90)

      .unit
        font-size rem(28)

    //- 表盘
    .meter
      absolute left 50% bottom rem(-250)
      size rem(500)
      margin-left rem(-250)

      .scale-mark
        absolute left top
        size rem(500)
        background #FFF
        border-radius rem(300)

      .cursor
        absolute left 50% top
        margin-left rem(-10)
        background red
        size rem(20) rem(250)

  //- 食材选择
  .food-select
    border-bottom 1px solid #DDD

    a
      display block
      font-size rem(28)
      text-align center
      line-height rem(80)

  // 食材营养列表
  .nutri-list
    ul
      font-size 0

    li
      display inline-block
      font-size rem(28)
      width 33.3%
      padding rem(30) rem(10) rem(30) rem(80)
      box-sizing border-box
</style>

<script>
  var deviceStore = require('../../stores/device');
  var NUTRIS = require('../../consts/nutris');

  module.exports = {
    data: function () {
      return {
        showMenu: false,
        state: deviceStore.state
      }
    },

    computed: {
      record: function () {
        var self = this;
        var ret = {};

        //console.log(this.state.food.name);

        NUTRIS.forEach(function(nutri, index){
          // 这里不能直接用self.state.food.length来获取对象的长度
          if (Object.keys(self.state.food).length) {
            ret[nutri] = self.state.weight * self.state.food[nutri] / self.state.food.weight;
          } else {
            ret[nutri] = 0;
          }
        });

        return ret;
      }
    },

    ready: function () {
      var self = this;

      // TODO: 模拟称重，待删除
      window.setTimeout(function () {
        deviceStore.setWeight(90);
      }, 5000);
    },

    methods: {
      redirectTo: function (url, evt) {
        evt.stopPropagation();
        this.$route.router.go(url);
      },

      saveRecord: function () {
        if (this.state.food.name !== undefined && this.state.weight !== 0) {
          this.record.name = this.state.food.name;
          this.record.date = new Date().toLocaleDateString();
          // TODO: 提交数据
          alert(JSON.stringify(this.record));
        }
      },

      toggleDropdown: function () {
        this.showMenu = !this.showMenu;
      },

      closeDropdown: function () {
        this.showMenu = false;
      }
    }
  };
</script>