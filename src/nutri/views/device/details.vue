<template lang="jade">
  .main-content.with-foot-actions
    //- 营养称仪表界面
    .scale-dashboard
      //- 蓝牙状态
      .bluetooth-status
        span(v-if="state.status==='disconnected'") {{ $t("status.disconnected") }}
        span(v-if="state.status==='connecting'") {{ $t("status.connecting") }}
        span(v-if="state.status==='connected'") {{ $t("status.connected") }}

      //- 历史纪录
      //- a.link-records(v-link="{path: '/records'}")

      //- 更多设置
      .more-settings(:class="{'open': showMenu}")
        button.trigger(@click="toggleDropdown", @blur="closeDropdown")
        .dropdown-menu
          span.triangle
          ul
            li(@mousedown="redirectTo('/devices', $event)") 设备
            li(@mousedown="redirectTo('/foods', $event)") 个人食材
            li(@mousedown="redirectTo('/records', $event)") 历史记录

      //- 实时结果
      .result
        em.num {{state.weight}}
        span.unit g

      //- 表盘
      .meter
        .scale-mark

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
      button.btn.btn-primary(@click="saveRecord") 保存
</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

  //- 营养称仪表界面
  .scale-dashboard
    size 100% rem(450)
    overflow hidden
    position relative

    //- 蓝牙状态
    .bluetooth-status
      absolute left 25% top rem(10)
      width 50%
      text-align center
      font-size rem(34)
      color #fff

    //- 历史纪录
    .link-records
      absolute left rem(10) top rem(10)
      size rem(60)
      background red

    //- 更多设置
    .more-settings
      absolute right rem(10) top rem(10)
      size rem(50)
      z-index 1
      margin-right rem(20)

      .trigger
        size rem(50)
        background url('../../../shared/assets/images/bg/icon_more.png') no-repeat 0 0
        background-size 100% 100%
        border none
        appearance none
        outline none

      .dropdown-menu
        display none
        absolute right top rem(60)
        min-width rem(180)
        font-size rem(24)
        color #ffa96f
        text-align center

        .triangle
          absolute right rem(10) top rem(-29rem)
          triangle(#fff, rem(30), up)

        li
          padding rem(24)
          background #fff
          white-space nowrap
          border-bottom 1px solid #ccc

          &:last-child
            border-bottom none

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
        absolute left 50% top
        size rem(250)
        background #FFF
        border-radius rem(300)
        margin-left rem(-125)


  //- 食材选择
  .food-select
    margin rem(20) 0 rem(30) 0
    text-align center

    a
      display block
      width rem(300)
      margin 0 auto
      font-size rem(24)
      line-height rem(60)
      color #FFF
      border-bottom 1px solid #FFF
      background url('../../../shared/assets/images/bg/icon_rightArrow.png') no-repeat right center
      background-size rem(16) rem(25)

  // 食材营养列表
  .nutri-list
    ul
      width 94%
      margin 0 auto
      box-sizing border-box
      font-size 0

    li
      display inline-block
      font-size rem(28)
      width 26.3%
      margin-left 7%
      padding-left rem(50)
      margin-bottom rem(50)
      box-sizing border-box
      color #FFF
      // border 1px solid #FFF

    .label
      font-size rem(20)

    .num
      font-size rem(30)

    .unit
      font-size rem(24)

    .icon-heat
      background url('../../../shared/assets/images/bg/icon_heat.png') no-repeat left center
      background-size rem(30) rem(30)

    .icon-protein
      background url('../../../shared/assets/images/bg/icon_protein.png') no-repeat left center
      background-size rem(30) rem(30)

    .icon-fat
      background url('../../../shared/assets/images/bg/icon_fat.png') no-repeat left center
      background-size rem(30) rem(30)

    .icon-chol
      background url('../../../shared/assets/images/bg/icon_chol.png') no-repeat left center
      background-size rem(30) rem(30)

    .icon-sugar
      background url('../../../shared/assets/images/bg/icon_sugar.png') no-repeat left center
      background-size rem(30) rem(30)

    .icon-fibrin
      background url('../../../shared/assets/images/bg/icon_fibrin.png') no-repeat left center
      background-size rem(30) rem(30)

    .icon-natrium
      background url('../../../shared/assets/images/bg/icon_natrium.png') no-repeat left center
      background-size rem(30) rem(30)
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