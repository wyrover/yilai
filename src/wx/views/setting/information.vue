<template lang="jade">
  .main-content.white
    .user_msg
      .user_faces
        img
      .sex(v-bind:data-sex="'male'")
      .user_nackname 微信昵称
    .entrance.user_birthday
      span.user_msg_title 出生日期
      span.user_msg_value {{information.birth}}
      input.setmsg.opacity#birthday(type="date", v-bind:value="information.birth",v-on:change="updatebirth")

    .entrance.user_height
      span.user_msg_title 身高
      span.user_msg_value {{information.height}}cm
      select.setmsg.user_msg_value.opacity#height(v-bind:value="information.height",v-on:change="updateheight")
        option(v-for="n in information.height",v-bind:value="n") {{n}}cm
        option(v-bind:value="information.height",v-bind:selected="true") {{information.height}}cm
        option(v-for="n in 250",v-bind:value="n",v-if="n > information.height") {{n}}cm
    .entrance.user_weight
      span.user_msg_title 体重
      span.user_msg_value 88kg
    .entrance.entrance_last.target_weight
      span.user_msg_title 目标体重(kg)
      input.setmsg.user_msg_value(type="number" value="60")
    .entrance.entrance_last.target_weight




</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

    .entrance
      span
        display block
        height 100%
        overflow hidden
        position absolute
      .user_msg_title
        width 90px
      .user_msg_value
        position relative
        left 105px
        color #ffad71
        border 0
        min-width 180px
      input[type="date"]
        &::-webkit-inner-spin-button
          visibility hidden
          width 1px
      .opacity
        height 40px
        position absolute
        left 122px
        top 0
        opacity 0
</style>
<script>
  var Modal = require('../../../shared/components/modal.vue');

  module.exports = {
    components: {
      'modal': Modal
    },

    data: function () {
      return {
        information:{
          "birth":"2015-11-11",
          "gender":"male",
          "height":175,
          "weight":80212,
          "taget_weight":78000
        }
      };
    },
    methods: {
      updatebirth: function () {
        var self = this;
        self.information.birth=document.getElementById("birthday").value;
        console.log(self.information.birth)
      },
      updateheight: function () {
        console.log("h")
        var self = this;
        self.information.height=document.getElementById("height").value-0;
      }
    }
  };
</script>