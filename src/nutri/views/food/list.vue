<template lang="jade">
.main-content
food-list(:foods="foods")
</template>

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
      foods: [],
      isSearchable: false
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
    }
  }
}
</script>