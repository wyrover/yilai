<template lang="jade">
  .main-content
    .food-edit-list
      form(v-form, name="foodAddForm", @submit="onSubmit")
        ul.edit-required-form
          li
            span Name
            div
              input(v-model="model.name", v-form-ctrl, required, name="model.name", placeholder="2-6charset")
          li
            span Weight
            div
              input(type="number", v-model="model.weight", v-form-ctrl, name="model.weight")
        ul.edit-optional-form
          li
            span Kcal
            div
              input(type="number", v-model="model.heat", v-form-ctrl, name="model.name")
          li
            span Protein
            div
              input(type="number", v-model="model.protein", v-form-ctrl, name="model.name")
          li
            span Body Fat
            div
              input(type="number", v-model="model.fat", v-form-ctrl, name="model.name")
          li
            span Cholesterol
            div
              input(type="number", v-model="model.chol", v-form-ctrl, name="model.name")
          li
            span Sugar
            div
              input(type="number", v-model="model.sugar", v-form-ctrl, name="model.name")
          li
            span Fiber
            div
              input(type="number", v-model="model.fibrin", v-form-ctrl, name="model.name")
          li
            span Sodium
            div
              input(type="number", v-model="model.natrium", v-form-ctrl, name="model.name")

    .foot-actions
      button.btn.btn-primary(type="submit") 保存

</template>

<script>
module.exports = {
  data: function () {
    return {
      model: {},
      foodAddForm: {}
    };
  },

  methods: {
    retunUnit: function (val, unit, name) {
      if (val.length)
      return this.val = val + unit;
      else
      return ''
    },
    onSubmit: function () {
      if(this.validForm.$valid)
      {
      }
      else{
        alert('校验不通过');
      }
    }
  }
};
</script>