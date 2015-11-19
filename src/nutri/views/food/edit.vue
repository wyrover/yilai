<template lang="jade">
.main-content
  ul.food-edit-list
    li.mr-top
      span 名称
      input(v-model="food.name")
      button X
    li
      span 重量
      input(v-model="food.weight")
      button X
    li.mr-top
      span 热量
      input(v-model="food.heat")
      button X
    li
      span 蛋白质
      input(v-model="food.protein")
      button X
    li
      span 脂肪
      input(v-model="food.fat")
      button X
    li
      span 胆固醇
      input(v-model="food.chol")
      button X
    li
      span 糖类
      input(v-model="food.sugar")
      button X
    li
      span 纤维素
      input(v-model="food.fibrin")
      button X
    li
      span 钠
      input(v-model="food.natrium")
      button X
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

.mr-top
  margin-top rem(50)
  border-top 1px solid #999
</style>

<script>
module.exports = {
  data: function () {
    return {
      food: {
        name: 'Aeer',
        weight: 0,
        heat: 0,
        protein: 0,
        fat: 0,
        chol: 0,
        sugar: 0,
        fibrin: 0,
        natrium: 0
      }
    };
  }
};
</script>