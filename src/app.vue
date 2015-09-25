<template lang="jade">
<component is="{{currentView}}"></component>
</template>

<script>
module.exports = {
  data: function () {
    return {
      currentView: 'home'
    };
  }
};
</script>

<style lang="stylus">
// 通用配置
@import 'assets/stylus/common'

// 重置
@import 'assets/stylus/reset'

// 定制
@import 'assets/stylus/customize'

// 占位符
@import 'assets/stylus/placeholders'

// 助手类
@import 'assets/stylus/helpers'

// Start: 小元件
@import 'assets/stylus/partials/button'
@import 'assets/stylus/partials/alert'
// End: 小元件

// 布局
@import 'assets/stylus/layout'

</style>