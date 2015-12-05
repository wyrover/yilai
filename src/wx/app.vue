<template lang="jade">
.page-container
  .loading(v-show="firstAccessChecking")
    p 正在检查是否第一次访问...

  router-view.view(transition="view", transition-mode="out-in")
  modal
    .modal-footer
      button(@click="hide") 确定
</template>

<style lang="stylus">
@import '../shared/assets/stylus/base'

  .page-container
    background url('../shared/assets/images/bg/device_bg.png') no-repeat 0 0
    background-size 100% 100%

/* Vue 初始化赋值 */
[v-cloak]
  display none
</style>

<script>
var Modal = require('../shared/components/modal.vue');
var appStore = require('../shared/stores/app');
var locales = require('../shared/consts/locales');

module.exports = {
  // 组件
  components: {
    'modal': Modal
  },

  // 视图初始化数据
  data: function () {
    return {
      firstAccessChecked: false,
      appState: appStore.state
    };
  },

  ready: function () {

  },

  methods: {
  }
};
</script>