<template lang="jade">
  .main-content.with-foot-actions
    .userweight
      .current_weight
        .weight_time
          span.time_num.day_date {{closestState.date.split(" ")[0].split("/")[1]}}-{{closestState.date.split(" ")[0].split("/")[2]}}
          span.time_num.time_date {{closestState.date.split(" ")[1].slice(0,5)}}
        .weight_number
          | {{closestState.weight/1000}}
          span.weight_unit kg
        .target_weight
          span.target_weight_span 目标
          span.target_weight_munber {{closestState.taget_weight/1000||0}}kg
      //-.chart
        a.chart_a(v-link="{path: '/chart'}")
      .setting
        a.setting_a(v-link="{path: '/setting'}")
      .current_bmi
        .bmi_colorstrip

        .bmi_pointer(v-if="closestState.bmi>0&closestState.bmi<18.5",v-bind:style="{left:closestState.bmi*2+'%'}")
          span(v-bind:style="{color:bmicolor.color1}") BMI {{closestState.bmi}} 过轻
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color1}")
        .bmi_pointer(v-if="closestState.bmi>=18.5&&closestState.bmi<=23.99",v-bind:style="{left:closestState.bmi*2+'%'}")
          span(v-bind:style="{color:bmicolor.color2}") BMI {{closestState.bmi}} 正常
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color2}")
        .bmi_pointer(v-if="closestState.bmi>23.99&&closestState.bmi<=27.9",v-bind:style="{left:closestState.bmi*2+'%'}")
          span(v-bind:style="{color:bmicolor.color3}") BMI {{closestState.bmi}} 超重
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color3}")
        .bmi_pointer(v-if="closestState.bmi>27.9&&closestState.bmi<=42.5",v-bind:style="{left:closestState.bmi*2+'%'}")
          span(v-bind:style="{color:bmicolor.color4}") BMI {{closestState.bmi}} 肥胖
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color4}")
        .bmi_pointer(v-if="closestState.bmi>43",v-bind:style="{left:'85%'}")
          span(v-bind:style="{color:bmicolor.color4}") BMI {{closestState.bmi}} 肥胖
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color4}")

    .constitutes
      ul
        li.constitutes_li.fat(v-if="closestState.fat||closestState.fat==0")
          .logo.fatlogo
          .text
            span.constitutes_title 脂肪率
            span {{closestState.fat/10}}%
        li.constitutes_li.moisture(v-if="closestState.moisture||closestState.moisture==0")
          .logo.moisturelogo
          .text
            span.constitutes_title 水分率
            span {{closestState.moisture/10}}%
        li.constitutes_li.bone(v-if="closestState.bone||closestState.bone==0")
          .logo.bonelogo
          .text
            span.constitutes_title 骨量
            span {{closestState.bone}}kg
        li.constitutes_li.muscle(v-if="closestState.muscle||closestState.muscle==0")
          .logo.musclelogo
          .text
            span.constitutes_title 肌肉率
            span {{closestState.muscle/10}}%
        li.constitutes_li.organs_li(v-if="closestState.internal_fat||closestState.internal_fat==0")
          .logo.organslogo
          .text
            span.constitutes_title 内脏脂肪
            span {{closestState.internal_fat}}%
        li.constitutes_li.internalage_li(v-if="closestState.internal_age||closestState.internal_age==0")
          .logo.internalagelogo
          .text
            span.constitutes_title 体内年龄
            span {{closestState.internal_age}}岁
        li.constitutes_li.basal_metabolism_li(v-if="closestState.metabolism||closestState.metabolism==0")
          .logo.basal_metabolism_logo
          .text
            span.constitutes_title 基础代谢
            span {{closestState.metabolism}}kcal

  //- modal
  //-   .modal-footer
  //-     button(@click="hide") 设置
  //-     button(@click="hide") 好
</template>

<style lang="stylus">

  @import '../../shared/assets/stylus/common'
  .main-content
    width 100%
    height 100%
    overflow-x hidden
    overflow-y auto
    padding-bottom 0
    .userweight
      width 100%
      height 275px
      margin 0 auto
      font-size rem(24)
      text-align center
      color #FFF
      overflow hidden

      .chart
        size rem(60) rem(60)
        absolute left rem(30) top rem(40)
        background-image url("../assets/images/icon/chart.png")
        background-size 100% 100%
        background-position center center
        a.chart_a
          display block
          width 100%
          height 100%
          //background ("url(../../assets/images/logo/chart.png") no-repeat center center)

      .setting
        size rem(60) rem(60)
        background-image url("../assets/images/icon/setting.png")
        background-size 100% 100%
        background-position center center
        absolute right rem(30) top rem(42)
        a.setting_a
          display block
          width 100%
          height 100%

      .current_weight
        width 100%
        height 212px
        position relative
        overflow hidden
        .weight_time
          width 100%
          font-size 0.7rem
          position absolute
          top 30px
          left 5px
          text-align center
          .time_num
            padding 0 3px
        .weight_number
          text-shadow 2px 2px rgba(0,0,0,0.3)
          width 100%
          height 120px
          line-height 120px
          margin 0 auto
          font-size 72px
          font-family Impact,Euphemia
          position absolute
          top 70px
          .weight_unit
            text-shadow 1px 1px rgba(0,0,0,0.1)
            position absolute
            font-size 1rem
            line-height 1.5rem
            height 1.5rem
            bottom 13px
            padding 10px 5px
            font-family 'Microsoft YaHei'
        .target_weight
          width 100%
          font-size 0.65rem
          position absolute
          top 190px
          text-align center
          font-size 0.7ren
          .target_weight_span
            margin-right 10px
      .current_bmi
        width 100%
        height 60px
        position relative
        margin 0 auto
        .bmi_colorstrip
          width 100%
          height 10px
          //border-radius 10px
          background -webkit-gradient(linear, 0 0, 100% 0, from(#8cfeff), to(#ff9d9c),color-stop(0.48,#91fea1),color-stop(0.55,#ffe286))
          //background-image url("../assets/images/setiao.jpg")
          background-size 100% 100%
          position absolute
          top 50px
          left 50%
          transform translateX(-50%)
        .bmi_pointer
          height 35px
          position absolute
          left 25%
          font-size 0.8rem
          padding-top 15px
          text-overflow ellipsis
          transform translateX(-50%)
          color red
          .triangle
            width 0
            height 0
            border-left 6px solid transparent
            border-right 6px solid transparent
            border-top 6px solid #fff //随着数值变化跟着变化颜色
            position absolute
            bottom 0
            left 50%
            transform translateX(-50%)
        .target_weight_span
          float left
        .target_weight_munber
          float right
    .constitutes
      width 100%
      height 230px
      overflow hidden
      ul
        padding 5px 0
        .constitutes_li
          display inline-block
          width 30%
          height 70px
          margin 0 1.5%
          padding 0
          position relative
          overflow hidden
          color #fff
          border 0
          .logo
            width 30px
            height 30px
            position absolute
            top 50%
            left 5px
            margin-top -10px
            background-size 100% 100%
          .fatlogo
            background-image url("../assets/images/icon/zhifang.png")
          .moisturelogo
            background-image url("../assets/images/icon/shuifen.png")
          .bonelogo
            background-image url("../assets/images/icon/guge.png")
          .musclelogo
            background-image url("../assets/images/icon/jirou.png")
          .weightlogo
            background-image url("../assets/images/icon/tizhong.png")
          .bmilogo
            background-image url("../assets/images/icon/BMI.png")
          .organslogo
            background-image url("../assets/images/icon/neizang.png")
          .internalagelogo
            background-image url("../assets/images/icon/tineinianling.png")
          .basal_metabolism_logo
            background-image url("../assets/images/icon/jichudaixie.png")
          .text
            height 60px
            float left
            position absolute
            left 40px
            top 50%
            margin-top -20px
            span
              font-size 16px
              line-height 25px
              display inherit
            .constitutes_title
              font-size 14px


</style>

<script>
  var Modal = require('../../shared/components/modal.vue');
  var api = require('../../wx/api');
  //var wxauth = require('../../wx/assets/js/wxauth');

  var test={};





  module.exports = {
    components: {
      'modal': Modal,
      //'wxauth': wxauth,
      'api': api
    },

    data: function () {
      return {
        'bmicolor':{
          "color1":"#8cfeff",
          "color2":"#91fea1",
          "color3":"#ffe286",
          "color4":"#ff9d9c"
        },
        closestState:{
          "date":"2015-11-11 12:00:00",
          "age":30,
          "height":178,
          "weight":802.12,
          "bmi":22,
          "fat":10,
          "moisture":11,
          "muscle":12,
          "bone":13,
          "metabolism":14,
          "taget_weight":12000
        },
        wxmsg:{
          code:"",
          tokenId:"",
          openid:""

        }
      };
    },

    route:{
      data:function(){
        var self = this;
        document.title = "健康管家";
        //alert("openid不存在？正常的话这里是true："+!localStorage.openid);
        self.wxmsg.code = localStorage.code;
        if(!localStorage.openid){
          if(self.wxmsg.code&&self.wxmsg.code!="null"){
            api.wxmsg.getWXmsg(localStorage.code).then(function (data) {
              //alert("本地openid，这个应该是没有的："+localStorage.openid)
              //alert("获取到的openid，这个是通过接口获取的，这个错的话发送请求的参数也是错的："+data.openid)
              self.wxmsg.openid=data.openid;
              self.wxmsg.access_token = data.access_token;
              self.wxmsg.expires_in = data.expires_in;
              self.wxmsg.refresh_token = data.refresh_token;
              localStorage.openid=data.openid;
              //alert("请求获得openid"+localStorage.openid);
            })
          }
        }else{
          self.wxmsg.openid=localStorage.openid;
          //alert("本地获得openid"+self.wxmsg.openid);
        }
        var openid = localStorage.openid;
        if(__DEBUG__){
          var openid = "ozEANuNXaPyykVqp6gTm2PwO404g";
        }
        //alert(localStorage.openid)

        // api.wxmsg.getWXmsg("001a21c9a9db39828199293797df48aX").then(function (data) {
        //   console.log(data)
        //   alert("openid:"+data.openid)

        //   localStorage.openid=data.openid;
        // })

        /*********************获取批量数据 取出第一条 start****************************/
        api.BluetoothScale.getMultiData({"count":1,"offset":0}).then(function(data,status){
          if(__DEBUG__){
            console.log(data)
          }


          var centerdata=data;
/***************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 start***************/
          for(var i=0;i<centerdata.length;i++){
            centerdata[i].bmi = centerdata[i].weight/1000/((centerdata[i].height/100)*(centerdata[i].height/100))
            var centertime = new Date(centerdata[i].time)
            var date = new Date(centerdata[i].time).getFullYear()+"/"+(new Date(centerdata[i].time).getMonth()+1)+"/"+new Date(centerdata[i].time).getDate();
            var hours = (new Date(centerdata[i].time).getHours()>9)?new Date(centerdata[i].time).getHours():"0"+new Date(centerdata[i].time).getHours()
            var minutes = (new Date(centerdata[i].time).getMinutes()>9)?new Date(centerdata[i].time).getMinutes():"0"+new Date(centerdata[i].time).getMinutes()
            centerdata[i].date =date+" "+hours+":"+minutes;
          }
          /**************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 end*****************/
          centerdata[0].taget_weight = 10000;
          self.closestState = centerdata[0];


          self.closestState.bmi = centerdata[0].weight/1000/((centerdata[0].height/100)*(centerdata[0].height/100));
          self.closestState.bmi = Math.round(self.closestState.bmi*10)/10
          /********************通过获取个人信息取得目标体重 start*************************/


          api.BluetoothScale.getUserInformation(openid).then(function (data) {
            if(__DEBUG__) {
              console.log(data);
            }
            self.closestState.taget_weight = data.taget_weight;
          });
          /********************通过获取个人信息取得目标体重 end*************************/
        })
        /*********************获取批量数据 取出第一条 end****************************/








        //console.log(self.closestState.taget_weight)
        /*
        api.BluetoothScale.getOneData(user_id).then(function (data) {
          if(__DEBUG__) {
            console.log(data);
          }
          closestState=data;
        });
        */
      }
    },
    methods:{
    }


  };
</script>
