<template lang="jade">
  .main-content.white
    .user_msg
      .user_faces
        img(v-bind:src="wxmsg.face",v-bind:width="'100%'",v-bind:height="'100%'")
      .sex(v-bind:data-sex="wxmsg.gender")
      .user_nackname {{wxmsg.name}}
    .entrance.user_birthday
      span.user_msg_title 出生日期
      span.user_msg_value {{information.birth}}
      input.setmsg.opacity#birthday(type="date", v-bind:value="information.birth",v-on:change="updatebirth")

    .entrance.user_height
      span.user_msg_title 身高
      span.user_msg_value {{information.height||0}}cm
      select.setmsg.user_msg_value.opacity#height(v-bind:value="information.height",v-on:change="updateheight")
        option(v-for="n in information.height-40-1",v-bind:value="n+40+1") {{n+40+1}}cm
        option(v-bind:value="information.height",v-bind:selected="true") {{information.height}}cm
        option(v-for="n in 250-information.height-1",v-bind:value="n+information.height+1") {{n+information.height+1}}cm
    .entrance.user_weight
      span.user_msg_title 体重
      span.user_msg_value {{information.weight/1000||0}}kg
    .entrance.entrance_last.target_weight
      span.user_msg_title 目标体重
      span.user_msg_value {{information.taget_weight||0}}kg
      select.setmsg.user_msg_value.opacity#taget_weight(v-bind:value="information.taget_weight",v-on:change="updatetaget_weight")
        option(v-for="n in information.taget_weight",v-bind:value="n") {{n}}kg
        option(v-bind:value="information.taget_weight",v-bind:selected="true") {{information.taget_weight}}kg
        option(v-for="n in 200-information.taget_weight-1",v-bind:value="n+information.taget_weight+1") {{n+information.taget_weight+1}}kg



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
        width 70px
        text-align justify
        text-align-last justify
        &:after//兼容手机微信文字两端对其
          display inline-block
          content ''
          overflow hidden
          width 100%
          height 0
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
  var api = require('../../../wx/api');
  module.exports = {
    components: {
      'modal': Modal,
      'api': api
    },

    data: function () {
      return {
        wxmsg:{
          "name":"测试微信昵称",
          "face":"http://img.wdjimg.com/mms/icon/v1/9/d4/22884940c69ffbe02cb97c52d7e60d49_256_256.png",
          "gender":"male"//"female"
        },
        information:{
          "birth":"2015-11-11",
          "gender":"male",
          "height":75,
          "weight":80200,
          "taget_weight":78
        },
        updataInformation:function(){
          var self = this;
          var postobj = {
            //"gender":"male",
            "brith":self.information.birth,
            "height":self.information.height,
            //"weight":80000,
            "taget_weight":self.information.taget_weight
          };
          api.BluetoothScale.setUserInformation(postobj).then(function (data) {
            if(__DEBUG__) {
              console.log(data);
            }
            console.log(data)
          });
        }
      };
    },

    route:{
      data:function(){
        document.title = "个人信息";
        var self = this;

        api.BluetoothScale.getUserInformation().then(function (data) {
          if(__DEBUG__) {
            console.log(data);
          }
           self.information = data;
           self.information.birth = data.birth||"2015-01-01";
           self.information.gender =(data.gender=="男"||data.gender=="male")?"male":"female";//默认是女的
           self.information.height = data.height||0;
           self.information.weight = data.weight||0;
           self.information.taget_weight=data.taget_weight||0;
           self.wxmsg.gender=(data.gender=="男"||data.gender=="male")?"male":"female";//默认是女的
           console.log(self.information)
        });
      }
    },
    methods: {
      updatebirth: function () {
        var self = this;
        self.information.birth=document.getElementById("birthday").value;
        self.updataInformation();//debug
      },
      updateheight: function () {
        var self = this;
        self.information.height=document.getElementById("height").value-0;
        self.updataInformation();//debug
      },
      updatetaget_weight: function () {
        var self = this;
        self.information.taget_weight=document.getElementById("taget_weight").value-0;
        self.updataInformation();//debug
      }

    }
  };
</script>