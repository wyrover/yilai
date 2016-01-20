<template lang="jade">
  .main-content.with-foot-actions
    //- 营养称仪表界面
    .scale-dashboard
      //- 蓝牙状态
      .device-name
        span 营养秤
      //- .bluetooth-status
      //-   span(v-if="state.status==='disconnected'") {{ $t("status.disconnected") }}
      //-   span(v-if="state.status==='connecting'") {{ $t("status.connecting") }}
      //-   span(v-if="state.status==='connected'") {{ $t("status.connected") }}

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

        //- 表盘
        .meter
          .scale-mark
            svg.svg#svg1(v-bind:width="'100%'",v-bind:height="'180px'")
              defs
                linearGradient#linearGradient-1(v-bind:x1="'0%'",v-bind:y1="'100%'",v-bind:x2="'100%'",v-bind:y2="'100%'")
                  stop(v-bind:stop-color="'#f4f4d3'",v-bind:offset="'0%'")
                  stop(v-bind:stop-color="'#87f196'",v-bind:offset="'40%'")
                  stop(v-bind:stop-color="'#f1c587'",v-bind:offset="'78%'")
                  stop(v-bind:stop-color="'#dbdb0b'",v-bind:offset="'100%'")
              g#circle1
                circle(v-bind:cx="svg.width/2",v-bind:cy="svg.height/2",v-bind:r="svg.r",stroke-width="4",v-bind:stroke="'#fff'",v-bind:fill="'none'")
              g#circle2.circle2(v-bind:style="'transform-origin:'+svg.width/2+'px '+svg.height/2+'px'")
                circle(v-bind:cx="svg.width/2",v-bind:cy="svg.height/2",v-bind:r="svg.r",stroke-width="6",v-bind:stroke="'#ffffa5'",v-bind:fill="'none'",v-bind:style="'stroke-dasharray:'+svg.r*2*3.14+';stroke-dashoffset:'+(svg.r*2*3.14*(1-(circle.percent>0.96?0.96:circle.percent)))")
              g#circle3
                circle(v-bind:cx="svg.width/2",v-bind:cy="svg.height/2",v-bind:r="8",v-bind:fill="'#ffffa5'",v-bind:style="'transform:rotate(-'+360*(1-(circle.percent>0.96?0.96:circle.percent))+'deg) translate(0,-'+svg.r+'px);transform-origin:'+svg.width/2+'px '+svg.height/2+'px'")
        .result_number
          .num {{weight}}
          span.unit g



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
    height 180px
    overflow hidden
    position relative
    padding-top 1.8rem
    //- 蓝牙状态
    .bluetooth-status
      absolute left 25% top rem(10)
      width 50%
      text-align center
      font-size rem(34)
      color #fff
    .device-name
      absolute left 25% top rem(10)
      width 50%
      text-align center
      font-size rem(34)
      color #fff
    //- 历史纪录
    .link-records
      absolute left rem(10) top rem(10)
      size rem(60)

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
        text-align left

        .triangle
          absolute right rem(10) top rem(-29rem)
          triangle(#fff, rem(30), up)

        li
          padding rem(24)
          background #fff
          white-space nowrap
          border-bottom 1px solid #e1e1e1

          &:last-child
            border-bottom none

      &.open
        .dropdown-menu
          display block

    //- 实时结果
    .result
      width 100%
      box-sizing border-box
      text-align center
      height 100%
      .meter
        width 100%
        height 180px
        position absolute
        .scale-mark
          position absolute
          top 0
          left 50%
          transform translate3d(-50%,0,0)
          width 180px
          height 180px
          .svg
            circle
              transition all ease 0.5s
            .circle2
              transform rotate(-90deg)
              transform-origin 90px 90px
      .result_number
        position absolute
        left 50%
        width 160px
        height 180px
        line-height 180px
        transform translate(-50%,0)
        color #fcffa5
        font-size 50px
        overflow hidden
        .num
          width 100%
          height 120px
          overflow hidden
          text-shadow: 2px 2px 2px rgba(0,0,0,0.3);
        span.unit
          position absolute
          top 0
          left 50%
          transform translate3d(-50%,0,0)
          font-size 20px
          line-height 260px



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
      border-bottom 1px solid #6ecac9
      border-top 1px solid #6ecac9
      background url('../../../shared/assets/images/bg/icon_rightArrow.png') no-repeat right center
      background-size rem(16) rem(25)

  // 食材营养列表
  .nutri-list
    ul
      width 98%
      margin 0 auto
      box-sizing border-box
      font-size 0

    li
      display inline-block
      font-size rem(28)
      width 26.3%
      margin-left 7%
      padding-left rem(50)
      margin-bottom 0.8rem
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
        svg:{
          r:75,
          width:180,
          height:180
        },
        showMenu: false,
        state: deviceStore.state,
        weight:2000,
        max_weight:3000,
        oldweigth:0

      }
    },

    computed: {
      circle:function(){
        var self = this;
        return {
          perimeter:self.svg.r*2*3.14, //周长
          percent:self.weight/self.max_weight
        }
      },
      record: function () {
        var self = this;
        var ret = {};

        console.log(this.state.food.name);

        NUTRIS.forEach(function(nutri, index){
          // 这里不能直接用self.state.food.length来获取对象的长度
          console.log(Object.keys(self.state.food).length)
          if (Object.keys(self.state.food).length) {
            console.log( self.state.food[nutri])
            ret[nutri] = self.weight * self.state.food[nutri] / self.state.food.weight;
          } else {
            ret[nutri] = 0;
          }
        });
        console.log(ret)
        return ret;
      }
    },
    watch:{
    },
    ready: function () {
      var self = this;
      var centerWeight = self.weight;
      self.weight = 0;
      // TODO: 模拟称重，待删除
      var setweight1 =  window.setTimeout(function () {
        self.weight = centerWeight;

      }, 0);
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
        console.log("123"+this.showMenu)
      },

      closeDropdown: function () {
        this.showMenu = false;
      }
    }
  };
</script>