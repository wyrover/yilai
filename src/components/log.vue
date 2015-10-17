<template lang="jade">
.debug-panel#debugPanel(v-class="debug-panel--unfolded: showLogs")
  .deubg-panel-body
    ul
      li(v-repeat="log in logs", v-text="log | stringify")
.btn-debug#btnDebug(v-on="click: showLogs = !showLogs") 调试
</template>

<script>
module.exports = {
  props: ['logs'],

  data: function () {
    return {
      showLogs: false
    }
  }
};

Vue.filter('stringify', function (value) {
  var type = typeof value;
  if (type === 'object') {
    return JSON.stringify(value);
  }
  return value
});
</script>