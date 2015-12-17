<template lang="jade">
.page-container
  router-view.view(transition="view", transition-mode="out-in")
</template>

<style lang="stylus">
@import '../shared/assets/stylus/base'

  .page-container
    background url('../shared/assets/images/bg/wx_bg.jpg') no-repeat 0 0
    background-size 100% 100%

/* Vue 初始化赋值 */
[v-cloak]
  display none
</style>