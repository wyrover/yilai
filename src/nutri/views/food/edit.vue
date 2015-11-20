<template lang="jade">
  .main-content
    .food-edit-list
      ul
        li
          span 名称
          input(v-model="name", @focus="editingName=true", @blur="editingName=false")
          button(v-show="!isEmpty(name) && editingName", @touchstart="name=''") X
        li
          span 重量
          input(v-model="weight", @focus="editingWeight=true", @blur="editingWeight=false")
          button(v-show="!isEmpty(weight) && editingWeight", @touchstart="weight=''") X
        li
          span 热量
          input(v-model="heat", @focus="editingHeat=true", @blur="editingHeat=false")
          button(v-show="!isEmpty(heat) && editingHeat", @touchstart="heat=''") X
        li
          span 蛋白质
          input(v-model="protein", @focus="editingProtein=true", @blur="editingProtein=false")
          button(v-show="!isEmpty(protein) && editingProtein", @touchstart="protein=''") X
        li
          span 脂肪
          input(v-model="fat", @focus="editingFat=true", @blur="editingFat=false")
          button(v-show="!isEmpty(fat) && editingFat", @touchstart="fat=''") X
        li
          span 胆固醇
          input(v-model="chol", @focus="editingChol=true", @blur="editingChol=false")
          button(v-show="!isEmpty(chol) && editingChol", @touchstart="chol=''") X
        li
          span 糖类
          input(v-model="sugar", @focus="editingSugar=true", @blur="editingSugar=false")
          button(v-show="!isEmpty(sugar) && editingSugar", @touchstart="sugar=''") X
        li
          span 纤维素
          input(v-model="fibrin", @focus="editingFibrin=true", @blur="editingFibrin=false")
          button(v-show="!isEmpty(fibrin) && editingFibrin", @touchstart="fibrin=''") X
        li
          span 钠
          input(v-model="natrium", @focus="editingNatrium=true", @blur="editingNatrium=false")
          button(v-show="!isEmpty(natrium) && editingNatrium", @touchstart="natrium=''") X
    .foot-actions
      button.btn-block(type="button") 保存
</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

  /* 个人食材列表 */
  .food-edit-list
    width 100%

    li
      width 90%
      height rem(100)
      line-height rem(100)
      padding 0 5%
      border-bottom 1px solid #666

      span
        display inline-block
        width rem(150)

      input
        width rem(300)
        height rem(83)
        border none
        padding 0
        outline none

      button
        size rem(100)
        border none
        background none
        padding 0
</style>

<script>
var Promise = require('promise');
var Modal = require('../../../shared/components/modal.vue');
var appStore = require('../../../shared/stores/app');
var locales = require('../../../shared/consts/locales');
//var foodEidt = require('../../../shared/components/food-edit.vue');

module.exports = {
  data: function () {
    return {
      name: 'Aeer',
      weight: 2.5,
      heat: 12.5,
      protein: 3.8,
      fat: 2.5,
      chol: 6,
      sugar: 2.5,
      fibrin: 3.8,
      natrium: 7.1,
      editingName: false,
      editingWeight: false,
      editingHeat: false,
      editingProtein: false,
      editingFat: false,
      editingChol: false,
      editingSugar: false,
      editingFibrin: false,
      editingNatrium: false
    };
  },

  methods: {
    isEmpty: function (val) {
      return val.length === 0;
    },

    doClear: function (val) {
      val = '';
    }
  }
};
</script>