<template lang="jade">
  .main-content
    .food-edit-list
      form
        ul
          li
            span 名称
            input(v-model="model.name", placeholder="输入名称", @focus="inputingName=true", @blur="model.name=retunUnit(model.name, '')")
          li
            span 重量
            input(v-model="model.weight", placeholder="0.00g",  @focus="inputingWeight=true", @blur="model.weight=retunUnit(model.weight, 'g')")
          li
            span 热量
            input(v-model="model.heat", placeholder="0.00kcal",  @focus="inputingHeat=true", @blur="model.heat=retunUnit(model.heat, 'kcal')" )
          li
            span 蛋白质
            input(v-model="model.protein", placeholder="0.00g", @focus="inputingProtein=true", @blur="model.protein=retunUnit(model.protein, 'g')")
          li
            span 脂肪
            input(v-model="model.fat", placeholder="0.00g", @focus="inputingFat=true", @blur="model.fat=retunUnit(model.fat, 'g')")
          li
            span 胆固醇
            input(v-model="model.chol", placeholder="0.00mg", @focus="inputingChol=true", @blur="model.chol=retunUnit(model.chol, 'g')")
          li
            span 糖类
            input(v-model="model.sugar", placeholder="0.00g", @focus="inputingSugar=true", @blur="model.sugar=retunUnit(model.sugar, 'mg')")
          li
            span 纤维素
            input(v-model="model.fibrin", placeholder="0.00g", @focus="inputingFibrin=true", @blur="model.fibrin=retunUnit(model.fibrin, 'g')")
          li
            span 钠
            input(v-model="model.natrium", placeholder="0.00mg", @focus="inputingNatrium=true", @blur="model.natrium=retunUnit(model.natrium, 'mg')")

      div(v-if="foodAddform.$submitted")
        p(v-if="foodAddform.name.$error.required") name不能为空
      .foot-actions
        button.btn.btn-block(type="submit") 保存
</template>

<script>
module.exports = {
  data: function () {
    return {
      model: {},
      inputingName: false,
      inputingWeight: false,
      inputingHeat: false,
      inputingProtein: false,
      inputingFat: false,
      inputingChol: false,
      inputingSugar: false,
      inputingFibrin: false,
      inputingNatrium: false,
      errorTip: ''
    };
  },

  methods: {
    retunUnit: function (val, unit, name) {
      if (val.length)
      return this.val = val + unit;
      else
      return ''
    }
  }
};
</script>