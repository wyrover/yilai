<template lang="jade">
.modal(v-show="state.isModalVisible")
  .modal-dialog
    .modal-header 提示
    .modal-body(v-text="state.modalMsg")
    slot(name="modal-footer")
</template>

<style lang="stylus">
@import '../assets/stylus/common'

.modal
  fixed left top
  size 100%
  overflow hidden
  z-index 10000
  background rgba(0, 0, 0, .4)

.modal-dialog
  absolute left 5% top 50%
  width 90%
  border-radius .5rem
  background #FFF
  margin-top -8rem

.modal-body
  text-align center
  font-size 1.6rem
  padding 2rem 10%

.modal-footer
  border-top 1px solid #DDD
  clearfix()

  button
    display block
    border none;
    background transparent;
    font-size 1.6rem
    width 100%
    padding 1.5rem 0
    text-align center
    color #0096D6
</style>

<script>
var appStore = require('../stores/app');

module.exports = {
  data: function () {
    return {
      state: appStore.state
    }
  },

  ready: function  () {
  },

  methods: {
    hide: function () {
      store.hideModal();
    }
  }
};
</script>