<template lang="jade">
  .main-content.white
    .user_msg
      .user_faces
        img(v-bind:src="wxmsg.headimgurl",v-bind:width="'100%'",v-bind:height="'100%'")
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
        option(v-for="n in 200",v-bind:value="n+50") {{n+50}}cm
    .entrance.user_weight
      span.user_msg_title 体重
      span.user_msg_value {{information.weight/1000||0}}kg
    .entrance.entrance_last.target_weight
      span.user_msg_title 目标体重
      span.user_msg_value {{information.target_weight||0}}kg
      select.setmsg.user_msg_value.opacity#target_weight(v-bind:value="information.target_weight",v-on:change="updatetarget_weight")
        option(v-for="n in 200",v-bind:value="n") {{n}}kg
    //-.entrance.entrance_last(v-on:click="test") 测试按钮



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
          "name":"111",
          "headimgurl":"",
          "gender":"female"//"female"
        },
        information:{
          "birth":"1999-9-9",
          "gender":"male",
          "height":75,
          "weight":60200,
          "target_weight":65
        },
        updataInformation:function(){
          var self = this;
          var postobj = {
            //"gender":"male",
            "birth":self.information.birth,
            "height":self.information.height,
            //"weight":80000,
            "target_weight":self.information.target_weight*1000
          };
          if(!localStorage.openid){
            if(__DEBUG__){console.log("本地不存在openid,")}
            if(localStorage.code&&localStorage.code!="null"){
              var openid = localStorage.openid
              api.BluetoothScale.setUserInformation(postobj,openid).then(function (data) {
                if(__DEBUG__) {
                  console.log(data);
                }

              });

            }
          }else{
            //var openid = "ozEANuBTIEscOwZ6wS4UFvhK38yw"
            var openid = localStorage.openid;
            api.BluetoothScale.setUserInformation(postobj,openid).then(function (data) {
              if(__DEBUG__) {
                console.log(data);
              }
            });
          }

        }
      };
    },

    route:{
      data:function(){
        document.title = "个人信息";
        var self = this;
        //alert("openid不存在？正常的话这里是true："+!localStorage.openid);

        if(!localStorage.openid){
            api.wxmsg.getWXmsg(localStorage.code).then(function (data) {
              //alert("本地openid，这个应该是没有的："+localStorage.openid)
              //alert("获取到的openid，这个是通过接口获取的，这个错的话发送请求的参数也是错的："+data.openid)
              localStorage.openid=data.openid;
              var openid = localStorage.openid;
              if(__DEBUG__){
                var openid = "ozEANuBTIEscOwZ6wS4UFvhK38yw"
              }
              //var openid = "ozEANuBTIEscOwZ6wS4UFvhK38yw"

              api.BluetoothScale.getUserInformation(openid).then(function (data) {
                if(__DEBUG__) {
                  console.log(data);
                }
                //self.information = data;
                self.information.birth = data.birth||"2005-01-01";
                self.information.gender =(data.gender=="男"||data.gender=="male"||data.gender-0==1)?"male":"female";//默认是女的
                self.information.height = data.height||0;
                self.information.weight = data.weight||0;
                self.information.target_weight = (data.target_weight/1000)||0;
                self.wxmsg.gender=(data.gender=="男"||data.gender=="male"||data.gender-0==1)?"male":"female";//默认是女的
                self.wxmsg.headimgurl = data.headimgurl
                self.wxmsg.name = data.name
                //console.log(self.wxmsg)
                api.BluetoothScale.getMultiData({"count":1,"offset":0},openid).then(function(data){
                  if(__DEBUG__){
                    console.log(data)
                  }
                  self.information.weight = data[0].weight;

                })
              });
            })

        }else{
          //var openid = "ozEANuBTIEscOwZ6wS4UFvhK38yw"
          var openid = localStorage.openid;
          if(__DEBUG__){
            openid="ozEANuNXaPyykVqp6gTm2PwO404g"
          }
          //alert("本地已经存在openid："+openid)
          api.BluetoothScale.getUserInformation(openid).then(function (data) {
            if(__DEBUG__) {
              console.log(data);
            }
            //alert("后端返回的体重："+data.weight);
            //alert("后端返回的身高"+data.height);
            //self.information = data;

            self.information.birth = data.birth||"2005-01-01";
            self.information.gender =(data.gender=="男"||data.gender=="male"||data.gender-0==1)?"male":"female";//默认是女的
            self.information.height = data.height||0;
            self.information.weight = data.weight||0;
            self.information.target_weight = (data.target_weight/1000)||0;
            self.wxmsg.gender=(data.gender=="男"||data.gender=="male"||data.gender-0==1)?"male":"female";//默认是女的
            self.wxmsg.headimgurl = data.headimgurl;
            self.wxmsg.name = data.name;
            //console.log(self.wxmsg)
            api.BluetoothScale.getMultiData({"count":1,"offset":0},openid).then(function(data){
              if(__DEBUG__){
                console.log(data)
              }
              self.information.weight = data[0].weight;

            })
          });
        }

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
      updatetarget_weight: function () {
        var self = this;
        self.information.target_weight=document.getElementById("target_weight").value-0;
        self.updataInformation();//debug
      },
      test:function(){
        api.wxmsg.getWXmsg("").then(function (data) {
          alert(data.openid)
        })
      }

    }
  };
</script>