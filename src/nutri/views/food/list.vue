<template lang="jade">
  .main-content.gap-top
    food-list(:foods="personalFoods", :removable="true", @food-click="editFood")
</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

  /* 内边间隙 */
  .gap-top
    padding-top rem(40)
</style>

<script>
  var FoodList = require('../../../shared/components/food-list.vue');

  module.exports = {
    components: {
      'food-list': FoodList
    },

    // 视图初始化数据
    data: function () {
      return {
        personalFoods: []
      }
    },

    route: {
      data: function (transition) {
        this.personalFoods = [{
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
      }
    },

    methods: {
      editFood: function (food) {
        // console.log(food);
        this.$route.router.go('/foods/edit/' + food.id);
      }
    }
  }
</script>
