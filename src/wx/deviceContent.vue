<template lang="jade">
.page-container
  component(:is="currentView")
  //details
  //users
</template>


<script>


  var Details = require('../wx/views/devices/details.vue');
  var Users = require('../wx/views/devices/users.vue');


  module.exports = {
    components: {
      'details': Details,
      'users': Users,

    },
    data: function () {
      return {
        currentView: getUrlStr("linkTo")
      }
    }
  }
function getUrlStr(name){
  var result = 0;
  if(window.location.href.split(name+"=")[1]){
    var result = window.location.href.split(name+"=")[1].split("&")[0];
  }
   return result;
}
</script>
<style lang="stylus">
  @import '../shared/assets/stylus/base'

  .page-container
    background url('../shared/assets/images/bg/wx_bg.jpg') no-repeat 0 0
    background-size 100% 100%
  .loadingdiv
    width 100%
    height 100%
    position fixed
    top 0
    left 0
</style>