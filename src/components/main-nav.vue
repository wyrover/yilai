<template lang="jade">
.main-nav
  nav.container
    ul
      li(v-repeat="link in nav", v-class="current: isCurrent(link)")
        a(href="#{{link.route}}", v-text="link.label")
</template>

<script>
module.exports = {
  data: function () {
    return {
      nav: []
    }
  },

  props: ['slug'],

  ready: function () {
    this.getNav();
  },

  methods: {
    getNav: function () {
      this.nav = [{
        label: 'Home',
        slug: 'home',
        route: '/'
      }, {
        label: 'Events',
        slug: 'events',
        route: '/events'
      }];
    },

    isCurrent: function (link) {
      return link.slug === this.slug;
    }

  }
};
</script>

<style lang="stylus">
// 通用配置
@import '../assets/stylus/common'

// 占位符
@import '../assets/stylus/placeholders'

.main-nav
  background gray-dark
  margin-bottom 20px

  ul
    reset-list()
    clearfix()

  li
    float left
    font-size 1.6rem

    a
      display block
      color #FFF
      text-decoration none
      padding 1rem 2rem
      transition background .4s

      &:hover
        background black

    &.current
      a
      a:hover
        background black
</style>