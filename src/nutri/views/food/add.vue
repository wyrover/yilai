<template lang="jade">
  .main-content
    .food-edit-list
      form(action="", method="get")
        ul
          li
            span 名称
            input(v-modal="name", placeholder="2-16个字符")
          li
            span 重量
            input(v-modal="weight", placeholder="0.00g")
          li
            span 热量
            input(v-modal="heat", placeholder="0.00kcal")
          li
            span 蛋白质
            input(v-modal="protein", placeholder="0.00g")
          li
            span 脂肪
            input(v-modal="fat", placeholder="0.00g")
          li
            span 胆固醇
            input(v-modal="chol", placeholder="0.00mg")
          li
            span 糖类
            input(v-modal="sugar", placeholder="0.00g")
          li
            span 纤维素
            input(v-modal="fibrin", placeholder="0.00g")
          li
            span 钠
            input(v-modal="natrium", placeholder="0.00mg")
      .foot-actions
        button.btn-block(type="submit") 保存
</template>

<script>
module.exports = {
  data: function () {
    return {
      name: '',
      weight: '',
      heat: '',
      protein: '',
      fat: '',
      chol: '',
      sugar: '',
      fibrin: '',
      natrium: ''
    };
  }
};
</script>