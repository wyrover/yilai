<template lang="jade">
.main-content
  .foods-search-bar
    .search-bar(v-bind:class="{'bar-inline': isInline}")
      input.search-input(placeholder="搜索", v-model="foodName",v-on:focus="inputFocus", v-on:blur="inputBlur")
    button.search-btn(type="reset",v-show="searching") 取消
  .foods-search-tips.tip-hot-food(v-show="hotFood") 热门食材
  .foods-search-tips.tip-search-result(v-show="hasResult") 搜索结果
  .none-search-result(v-show="hasResult")
    .tip-none-result 暂未搜索结果!
    a(href="#") 立即添加食材>
  food-list(v-show="hotFood", :foods="foods | limitBy 5")
  food-list(v-show="!hotFood", :foods="foods | filterBy foodName in 'name'")
</template>

<style lang="stylus">
@import '../../../shared/assets/stylus/common'

/* 食材搜索栏 */
.foods-search-bar
  size 90% rem(80)
  padding rem(20) 5% rem(20) 5%
  background #f5f5f5
  overflow hidden
  transition all .5s ease

  .search-bar
    position relative
    display inline-block
    width 100%
    height rem(80)
    padding-left rem(80)
    padding-right rem(80)
    border 1px solid #999
    border-radius rem(40)
    background #f5f5f5
    box-sizing border-box
    transition: width .5s ease;
    -moz-transition: width .5s ease;
    -webkit-transition: width .5s ease;
    -o-transition: width .5s ease;

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

  .search-btn
    size 18% rem(80)
    font-size rem(16)
    border none
    background none

  .bar-inline
    width 80%
    transition: width .5s ease;
    -moz-transition: width .5s ease;
    -webkit-transition: width .5s ease;
    -o-transition: width .5s ease;


/* 搜索提示语 */
.foods-search-tips
  size 90% rem(80)
  line-height rem(80)
  padding 0 5%
  background #f5f5f5
  color #999
  border-top 1px solid #999
  border-bottom 1px solid #999

</style>

<script>
var Promise = require('promise');
var Modal = require('../../../shared/components/modal.vue');
var appStore = require('../../../shared/stores/app');
var locales = require('../../../shared/consts/locales');
var FoodList = require('../../../shared/components/food-list.vue');

module.exports = {
  components: {
    'food-list': FoodList
  },

  // 视图初始化数据
  data: function () {
    return {
      isInline: false,
      searching: false,
      hotFood: false,
      hasResult: false,
      foodName: '',
      foods: [],
      filteredFoods: []
    }
  },

  route: {
    data: function (transition) {
      return {
        foods: this.fetchFoods()
      }
    }
  },

  methods: {
    fetchFoods: function () {
      if(__DEBUG__) {
        return new Promise(function (resolve, reject) {
          resolve([
            {name: 'Jack'},
            {name: 'Anna'},
            {name: 'Zero'},
            {name: 'Yon'},
            {name: '李三'},
            {name: '张四'},
            {name: '陈五'}
            ]);
        });
      }
      return Promise.resolve($.ajax({
        url: '',
        type: 'get'
      }));
    },
    inputFocus: function(e){
      this.isInline = true;
      this.searching = true;
      this.hotFood = true;
    },
    inputBlur: function(e){
      this.isInline = false;
      this.searching = false;
      this.hotFood = false;
      this.foodName = '';
    }
  }
}
</script>