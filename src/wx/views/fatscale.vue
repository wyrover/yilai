<template lang="jade">
  .main-content.with-foot-actions

    .userweight
      .current_weight
        .weight_time(v-if="closestState.date.split(' ')[0].split('/')[1]-0>0")
          span.time_num.day_date {{closestState.date.split(" ")[0].split("/")[1]}}-{{closestState.date.split(" ")[0].split("/")[2]}}
          span.time_num.time_date {{closestState.date.split(" ")[1].slice(0,5)}}
        .weight_number
          | {{closestState.weight>=0?closestState.weight/1000:'--'}}
          span.weight_unit {{closestState.weight>=0?'kg':''}}
        .target_weight
          span.target_weight_span 目标体重
          span.target_weight_munber(v-if="closestState.target_weight>=0") {{closestState.target_weight/1000||0}}kg
          span.target_weight_munber(v-if="closestState.target_weight<0") --
      //.chart
        a.chart_a(v-link="{path: '/chart'}")
      .setting
        a.setting_a(v-link="{path: '/setting'}")
      .current_bmi
        .bmi_colorstrip
          span.color1(v-bind:style="'background:#8cfeff;left:0%'")
          span.color2(v-bind:style="'background:#91fea1;left:25%'")
          span.color3(v-bind:style="'background:#ffe286;left:50%'")
          span.color4(v-bind:style="'background:#ff9d9c;left:75%'")
        .bmi_pointer(v-if="closestState.bmi>0&closestState.bmi<=14.5",v-bind:style="{left:'19%'}")
          span(v-bind:style="{color:bmicolor.color1}") BMI {{closestState.bmi}} 过轻
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color1}")
        .bmi_pointer(v-if="closestState.bmi>14.5&closestState.bmi<18.5",v-bind:style="{left:(closestState.bmi-14.5)*1.5+19+'%'}")
          span(v-bind:style="{color:bmicolor.color1}") BMI {{closestState.bmi}} 过轻
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color1}")
        .bmi_pointer(v-if="closestState.bmi>=18.5&&closestState.bmi<=23.99",v-bind:style="{left:((closestState.bmi-18.5)*6.25+25)+'%'}")
          span(v-bind:style="{color:bmicolor.color2}") BMI {{closestState.bmi}} 正常
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color2}")
        .bmi_pointer(v-if="closestState.bmi>23.99&&closestState.bmi<28",v-bind:style="{left:((closestState.bmi-24)*6.25+50)+'%'}")
          span(v-bind:style="{color:bmicolor.color3}") BMI {{closestState.bmi}} 超重
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color3}")
        .bmi_pointer(v-if="closestState.bmi>=28&&closestState.bmi<=32",v-bind:style="{left:((closestState.bmi-28)*1.5+75)+'%'}")
          span(v-bind:style="{color:bmicolor.color4}") BMI {{closestState.bmi}} 肥胖
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color4}")
        .bmi_pointer(v-if="closestState.bmi>32",v-bind:style="{left:'81%'}")
          span(v-bind:style="{color:bmicolor.color4}") BMI {{closestState.bmi}} 肥胖
          i.triangle(v-bind:style="{borderTopColor:bmicolor.color4}")

    .constitutes
      ul
        li.constitutes_li.fat
          .logo.fatlogo
          .text
            span.constitutes_title 脂肪率
            span.sign(v-show="sign.fat") {{sign.fat}}
            span.num(v-show="closestState.fat>=0") {{closestState.fat/10}}%
            span.num(v-show="closestState.fat<0") --
        li.constitutes_li.moisture
          .logo.moisturelogo
          .text
            span.constitutes_title 水分率
            span.sign(v-show="sign.moisture") {{sign.moisture}}
            span.num(v-show="closestState.moisture>=0") {{closestState.moisture/10}}%
            span.num(v-show="closestState.moisture<0") --
        li.constitutes_li.muscle
          .logo.musclelogo
          .text
            span.constitutes_title 肌肉率
            span.sign(v-show="sign.muscle") {{sign.muscle}}
            span.num(v-show="closestState.muscle>=0") {{closestState.muscle/10}}%
            span.num(v-show="closestState.muscle<0") --
        li.constitutes_li.bone
          .logo.bonelogo
          .text
            span.constitutes_title 骨量
            span.num(v-show="closestState.bone>=0") {{closestState.bone/10}}kg
            span.num(v-show="closestState.bone<0") --
        li.constitutes_li.organs_li
          .logo.organslogo
          .text
            span.constitutes_title 内脏脂肪
            span.num(v-show="closestState.internal_fat>=0") {{closestState.internal_fat}}
            span.num(v-show="closestState.internal_fat<0") --
        li.constitutes_li.internalage_li
          .logo.internalagelogo
          .text
            span.constitutes_title 体内年龄
            span.num(v-show="closestState.internal_age>=0") {{closestState.internal_age}}岁
            span.num(v-show="closestState.internal_age<0") --
        li.constitutes_li.basal_metabolism_li
          .logo.basal_metabolism_logo
          .text
            span.constitutes_title 基础代谢
            span.num(v-show="closestState.metabolism>=0") {{closestState.metabolism}}kcal
            span.num(v-show="closestState.metabolism<0") --
    .moreBox
      .parameterMore(v-link="{path: '/setting/equipment/details/explain'}")
        span 参数说明 &gt;
      .helpMore(v-link="{path: '/setting/equipment/details/help'}")
        span 使用帮助 &gt;
    .loadingdiv(v-if="loadData" v-bind:data-pageshow = "pageshow")
      loading
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
      height 250px
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
        height 182px
        position relative
        overflow hidden
        .weight_time
          width 100%
          font-size 0.7rem
          position absolute
          top 30px
          left 2px
          text-align center
          .time_num
            padding 0 3px
        .weight_number
          text-shadow 2px 2px rgba(0,0,0,0.3)
          width 100%
          height 100px
          line-height 90px
          margin 0 auto
          font-size 72px
          font-family Impact,Euphemia
          position absolute
          top 60px
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
          top 160px
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
          span
            display inline-block
            position absolute
            width 50%
            top 0
            left 0
            height 100%
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
      height 180px
      overflow-x hidden
      overflow-y auto
      ul
        width 92%
        margin 0 auto
        box-sizing border-box
        .constitutes_li
          display inline-block
          width 100%
          height 40px
          padding 0
          position relative
          color #fff
          border-bottom 1px solid #56bdd0
          //border-bottom 1px solid red

          .logo
            width 30px
            height 30px
            position absolute
            top 50%
            left 5px
            transform translate3d(0,-50%,0)
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
            height 40px
            width 100%
            position absolute
            left 0
            padding-left 40px
            box-sizing border-box
            span
              font-size 16px
              line-height 40px
              float left
            .constitutes_title
              font-size 16px
            .sign
              height 20px
              line-height 20px
              border 1px solid #fff
              margin 10px
              padding 0 10px
              border-radius 12px
              font-size 12px
            .num
              float right
              margin-right 3px
        .constitutes_li:last-child
          border-bottom:0
  .moreBox
    width 100%
    height 50px
    position fixed
    bottom 0
    line-height 50px
    text-align center
    color #fff
    font-size 15px
    border-top 1px solid #56bdd0
    .parameterMore
      width 50%
      position absolute
      left 0
    .helpMore
      width 50%
      position absolute
      left 50%
  .loadingdiv
    width 100%
    height 100%
    position fixed
    left 0
    top 0
    z-index 10
    opacity 1
  [data-pageshow = true]
    opacity 0

</style>

<script>
  var Modal = require('../../shared/components/modal.vue');
  var Loading = require('../../shared/components/loading.vue');
  var api = require('../../wx/api');
  var Measurement_result = require('../../wx/consts/measurement_result');
  //var wxauth = require('../../wx/assets/js/wxauth');
  var test={};





  module.exports = {
    components: {
      'modal': Modal,
      'loading': Loading
      //'wxauth': wxauth,
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
          "date":"2001/0/0 12:00:00",
          "age":0,
          "height":0,
          "weight":-1,
          "bmi":-1,
          "fat":-1,
          "moisture":-1,
          "muscle":-1,
          "bone":-1,
          "metabolism":-1,
          "target_weight":-1,
          internal_fat:-1,
          internal_age:-1
        },
        wxmsg:{
          code:"",
          tokenId:"",
          openid:"",
          gender:"male"
        },
        pageshow:false
      };
    },
    computed:{
      loadData:function(){
        return !this.pageshow
      },
      sign:function(){
        var self = this;
        return {
          fat:Measurement_result.fat(self.wxmsg.gender,self.closestState.age-0,self.closestState.fat/10),
          moisture:Measurement_result.moisture(self.wxmsg.gender,self.closestState.age-0,self.closestState.moisture/10),
          muscle:Measurement_result.muscle(self.wxmsg.gender,self.closestState.age-0,self.closestState.muscle/10)
        }

      }
    },
    route:{
      data:function(){
        var self = this;
        document.title = "健康管家";

        //alert("openid不存在？正常的话这里是true："+!localStorage.openid);
        self.wxmsg.code = localStorage.code;
        if(!localStorage.openid){
          //alert("code存在？"+self.wxmsg.code&&self.wxmsg.code!="null")
          if(self.wxmsg.code&&self.wxmsg.code!="null"){
            api.wxmsg.getWXmsg(localStorage.code).then(function (data) {
              //alert("本地openid，这个应该是没有的："+localStorage.openid)
              //alert("获取到的openid，这个是通过接口获取的，这个错的话发送请求的参数也是错的："+data.openid)
              self.wxmsg.openid=data.openid;
              self.wxmsg.access_token = data.access_token;
              self.wxmsg.expires_in = data.expires_in;
              self.wxmsg.refresh_token = data.refresh_token;
              localStorage.openid=data.openid;

              /*********************获取批量数据 取出第一条 start****************************/
              if(localStorage.state==0){
                var openid = localStorage.openid;
                if(__DEBUG__){
                  var openid = "ozEANuMKQsrGLWXJ4D82louIQeWs";
                }
                getLastData(openid,self);
              /*********************获取批量数据 取出第一条 end****************************/
              }else {
                /*********获取某id对应的一条数据 start************/
                var state = localStorage.state;
                getOneData(state,self)
                /*********获取某id对应的一条数据  end************/
              }
              //alert("请求获得openid"+localStorage.openid);
            })
          }
        }else{
          self.wxmsg.openid=localStorage.openid;

          /*********************获取批量数据 取出第一条 start****************************/
          if(__DEBUG__){
            localStorage.state=0
          }
          if(localStorage.state==0){
            var openid = localStorage.openid;
            if(__DEBUG__){
              var openid = "ozEANuMKQsrGLWXJ4D82louIQeWs";
            }
            getLastData(openid,self);
          /*********************获取批量数据 取出第一条 end****************************/
          }else {
            /*********获取某id对应的一条数据 start************/
            var state = localStorage.state;
            getOneData(state,self)
            /*********获取某id对应的一条数据  end************/
          }

        }
      }
    },
    ready:function(){
      var self = this;
      setTimeout(function(){
        var constitutesHeight = window.innerHeight-(document.getElementsByClassName("userweight")[0].clientHeight+document.getElementsByClassName("moreBox")[0].clientHeight);
        document.getElementsByClassName("constitutes")[0].style.height = constitutesHeight+"px"
      },0)
    },
    methods:{
    }


  };

  function getOneData(state,self){
    api.BluetoothScale.getOneData(state).then(function (data) {
      if(__DEBUG__) {
        console.log(data);
      }
      var centerdata=data;
      /***************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 start***************/
      centerdata.bmi = centerdata.weight/1000/((centerdata.height/100)*(centerdata.height/100))
      var centertime = new Date(centerdata.time)
      var date = new Date(centerdata.time).getFullYear()+"/"+(new Date(centerdata.time).getMonth()+1)+"/"+new Date(centerdata.time).getDate();
      var hours = (new Date(centerdata.time).getHours()>9)?new Date(centerdata.time).getHours():"0"+new Date(centerdata.time).getHours()
      var minutes = (new Date(centerdata.time).getMinutes()>9)?new Date(centerdata.time).getMinutes():"0"+new Date(centerdata.time).getMinutes();
      centerdata.date =date+" "+hours+":"+minutes;

      /**************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 end*****************/
      self.closestState = centerdata;
      self.closestState.bmi = centerdata.weight/1000/((centerdata.height/100)*(centerdata.height/100));
      self.closestState.bmi = Math.round(self.closestState.bmi*10)/10

      self.pageshow =true;
    });
  }
  function getLastData(openid,self){
    api.BluetoothScale.getMultiData({"count":1,"offset":0},openid).then(function(data,status){
      if(__DEBUG__){
        console.log("这里是获取最近一次数据")
        console.log(data)
      }
      if(data.length==0){
        self.pageshow =true;
        //alert("未查询到测量结果")
      }
      var centerdata=data[0];
      /***************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 start***************/
      centerdata.bmi = centerdata.weight/1000/((centerdata.height/100)*(centerdata.height/100))
      var centertime = new Date(centerdata.time)
      var date = new Date(centerdata.time).getFullYear()+"/"+(new Date(centerdata.time).getMonth()+1)+"/"+new Date(centerdata.time).getDate();
      var hours = (new Date(centerdata.time).getHours()>9)?new Date(centerdata.time).getHours():"0"+new Date(centerdata.time).getHours()
      var minutes = (new Date(centerdata.time).getMinutes()>9)?new Date(centerdata.time).getMinutes():"0"+new Date(centerdata.time).getMinutes();
      centerdata.date =date+" "+hours+":"+minutes;

      /**************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 end*****************/
      /***************获取目标体重 start****************/
      api.BluetoothScale.getUserInformation(openid).then(function(data){
        if(__DEBUG__){
          console.log(data)
        }
        centerdata.target_weight = data.target_weight;
        centerdata.height = data.height;
        self.closestState = centerdata;
        self.closestState.bmi = (centerdata.weight/1000)/((centerdata.height/100)*(centerdata.height/100));
        self.closestState.bmi = Math.round(self.closestState.bmi*10)/10
        self.wxmsg.gender=(data.gender=="男"||data.gender=="male"||data.gender-0==1)?"male":"female";
        self.pageshow =true;
      })
      /***************获取目标体重 end****************/
    })
  }
</script>
