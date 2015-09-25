<template lang="jade">
main-nav(slug="{{slug}}")
.container
  h1(v-text="title")
  p This is homepage.
</template>

<script>
var MainNav = require('../components/main-nav.vue');

module.exports = {
  components: {
    'main-nav': MainNav
  },

  data: function () {
    return {
      slug: 'home',
      title: ''
    };
  },

  ready: function () {
    this.title= 'Home'
  }
};
</script>
