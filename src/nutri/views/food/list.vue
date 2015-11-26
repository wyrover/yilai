<template lang="jade">
  .main-content
    food-list(:foods="foods | orderBy 'nameInPinyin'", :removable="true", @food-click="viewFood(food)")
</template>

<script>
  var Promise = require('promise');
  var han = require('han');
  var FoodList = require('../../../shared/components/food-list.vue');

  module.exports = {
    components: {
      'food-list': FoodList
    },

    // 视图初始化数据
    data: function () {
      return {
        foods: []
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
      viewFood: function (food) {
        console.log(food);
      },

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
      }
    }
  }
</script>