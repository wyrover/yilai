<template lang="jade">
  .main-content
    search-bar(:key="foodName", :active="searching", @search="setFoodName", @search-activate="toggleSearching", @search-deactivate="toggleSearching", @cancel="cancelSearching")
    .search-result
      .search-result-title(v-if="searchResultTitle") {{searchResultTitle}}
      food-list(:foods="filteredFoods | filterBy foodName in 'nameInPinyin'", @food-click="selectFood")
</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

  /* 搜索提示语 */
  .search-result-title
    size 100% rem(60)
    line-height rem(60)
    padding 0 5%
    color #FFF
    font-weight normal
    font-size rem(24)
    box-sizing border-box
</style>

<script>
  var Promise = require('promise');
  var han = require('han');
  var FoodList = require('../../../shared/components/food-list.vue');
  var SearchBar = require('../../../shared/components/search-bar.vue');
  var deviceStore = require('../../stores/device')
  var filters = {
    all: function (foods) {
      return foods.concat().sort(function (a, b) {
        return a.nameInPinyin > b.nameInPinyin;
      });
    },

    hot: function (foods) {
      // concat()返回新数组，避免 foods 受到改动
      return foods.concat().sort(function (a, b) {
        return b.times - a.times;
      }).splice(0, 5);
    }
  };

  module.exports = {
    components: {
      'food-list': FoodList,
      'search-bar': SearchBar
    },

    // 视图初始化数据
    data: function () {
      return {
        foodName: '',
        foods: [],
        searching: false,
        state: deviceStore.state
      }
    },

    computed: {
      visibility: function () {
        return this.foodName.length === 0 && this.searching ? 'hot' : 'all';
      },

      filteredFoods: function () {
        return filters[this.visibility](this.foods);
      },

      translatedFoodName: function () {
        return han.letter(this.foodName);
      },

      searchResultTitle: function () {
        if (this.visibility === 'hot') {
          return '热门食材';
        }

        if (this.foodName.length !== 0) {
          return '搜索结果';
        }

        return '';
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
            var foods = [{
              id: '1',
              name: '面包',
              weight: 100,
              heat: 1000,
              protein: 20.2,
              fat: 0.5,
              chol: 0.8,
              sugar: 50,
              fibrin: 103.5,
              natrium: 0.5,
              times: 5
            }, {
              id: '2',
              name: '玉米',
              weight: 200,
              heat: 800,
              protein: 30.8,
              fat: 1.2,
              chol: 1.2,
              sugar: 22,
              fibrin: 99.4,
              natrium: 0.2,
              times: 10
            }, {
              id: '3',
              name: 'apple',
              weight: 200,
              heat: 800,
              protein: 30.8,
              fat: 1.2,
              chol: 1.2,
              sugar: 22,
              fibrin: 99.4,
              natrium: 0.2,
              times: 10
            }];

            // 为每个食材添加一个拼音名称字段，以用于排序操作
            foods.map(function (food) {
              food.nameInPinyin = han.letter(food.name);
            });

            resolve(foods);
          });
        }
        return Promise.resolve($.ajax({
          url: '',
          type: 'get'
        }));
      },

      setFoodName: function (name) {
        this.foodName = name;
      },

      toggleSearching: function () {
        this.searching = !this.searching;
      },

      cancelSearching: function () {
        this.setFoodName('');
      },

      selectFood: function (food) {
        deviceStore.setFood(food);
        this.$route.router.go('/devices/' + food.id);
      }
    }
  };
</script>