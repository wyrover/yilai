<template lang="jade">
  .main-content
    .food-edit-list
      form(v-form, name="foodEditForm", @submit="onSubmit")
        ul.edit-required-form
          li
            span Name
            div
              input(v-model="food.name", v-form-ctrl, required, name="food.name", @focus="editingName=true", @blur="editingName=false")
              button.btn-delete(v-show="!isEmpty(food.name) && editingName", @mousedown="food.name=''")
          li
            span Weight
            div
              input(type="number", v-model="food.weight", , v-form-ctrl, required, name="food.weight" @focus="editingWeight=true", @blur="editingWeight=false")
              button.btn-delete(v-show="!isEmpty(food.weight) && editingWeight", @mousedown="food.weight=''")
        ul.edit-optional-form
          li
            span Kcal
            div
              input(type="number", v-model="food.heat", @focus="editingHeat=true", @blur="editingHeat=false")
              button.btn-delete(v-show="!isEmpty(food.heat) && editingHeat", @mousedown="food.heat=''")
          li
            span Protein
            div
              input(type="number", v-model="food.protein", @focus="editingProtein=true", @blur="editingProtein=false")
              button.btn-delete(v-show="!isEmpty(food.protein) && editingProtein", @mousedown="food.protein=''")
          li
            span Body Fat
            div
              input(type="number", v-model="food.fat", @focus="editingFat=true", @blur="editingFat=false")
              button.btn-delete(v-show="!isEmpty(food.fat) && editingFat", @mousedown="food.fat=''")
          li
            span Cholesterol
            div
              input(type="number", v-model="food.chol", @focus="editingChol=true", @blur="editingChol=false")
              button.btn-delete(v-show="!isEmpty(food.chol) && editingChol", @mousedown="food.chol=''")
          li
            span Sugar
            div
              input(type="number", v-model="food.sugar", @focus="editingSugar=true", @blur="editingSugar=false")
              button.btn-delete(v-show="!isEmpty(food.sugar) && editingSugar", @mousedown="food.sugar=''")
          li
            span Fiber
            div
              input(type="number", v-model="food.fibrin", @focus="editingFibrin=true", @blur="editingFibrin=false")
              button.btn-delete(v-show="!isEmpty(food.fibrin) && editingFibrin", @mousedown="food.fibrin=''")
          li
            span Sodium
            div
              input(type="number", v-model="food.natrium", @focus="editingNatrium=true", @blur="editingNatrium=false")
              button.btn-delete(v-show="!isEmpty(food.natrium) && editingNatrium", @mousedown="food.natrium=''")
    .foot-actions
      button.btn.btn-primary(type="button") 保存
</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

  .food-edit-list
    padding-top rem(24)

  /* 必填表单 */
  .edit-required-form
    width 100%
    border-bottom rem(4) solid #FFF

    li
      position relative
      width 100%
      height rem(104)
      clearfix()

      span
        float left
        width 20%
        margin-left 5%
        height rem(104)
        line-height rem(104)
        font-size rem(30)
        color #FFF

      div
        float left
        width 70%
        height rem(104)
        padding-right 5%
        border-top 1px solid #FFF

        input
          width 80%
          height rem(104)
          border none
          outline none
          padding 0
          background transparent
          color #FFF

  /* 选填表单 */
  .edit-optional-form
    width 100%

    li
      position relative
      width 100%
      height rem(104)
      clearfix()

      span
        float left
        width 30%
        margin-left 5%
        margin-right 5%
        height rem(104)
        line-height rem(104)
        font-size rem(30)
        color #FFF
        text-align right

      div
        float left
        width 55%
        height rem(104)
        padding-right 5%
        border-bottom 1px solid #FFF

        input
          width 80%
          height rem(104)
          border none
          outline none
          padding 0
          background transparent
          color #FFF

  /* 删除按钮 */
  .btn-delete
    absolute right 8% top
    size rem(30) rem(104)
    border none
    background none
    padding 0
    background url('../../../shared/assets/images/bg/icon_delete.png') no-repeat 0 center
    background-size rem(30) rem(30)


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
      editingName: false,
      editingWeight: false,
      editingHeat: false,
      editingProtein: false,
      editingFat: false,
      editingChol: false,
      editingSugar: false,
      editingFibrin: false,
      editingNatrium: false,
      food: {
        name: '',
        weight: 0,
        heat: 0,
        protein: 0,
        fat: 0,
        chol: 0,
        sugar: 0,
        fibrin: 0,
        natrium: 0
      },
      foodEditForm: {}
    };
  },

  route: {
    data: function () {
      return {
        food: {
          name: 'aaa',
          weight: 2.5,
          heat: 12.5,
          protein: 3.8,
          fat: 2.5,
          chol: 6,
          sugar: 2.5,
          fibrin: 3.8,
          natrium: 7.1
        }
      };
    }
  },

  methods: {
    isEmpty: function (val) {
      return val.length === 0;
    },

    doClear: function (val) {
      val = '';
    },

    onSubmit: function () {
      console.log(this.foodEditForm.$valid);
    }
  }
};
</script>
