<template lang="jade">
  .main-content.white
    //-.bug这个div是用于修复无法解释的bug  如果没有这个东西  下面的微信用户昵称将会无法正常显示 不要问为什么  我也不知道
    .bug {{wxmsg.name}}
    //-.bug这个div是用于修复无法解释的bug  如果没有这个东西  下面的微信用户昵称将会无法正常显示 不要问为什么  我也不知道
    .user_msg
      .user_faces
        img(v-bind:src="wxmsg.headimgurl",v-bind:width="'100%'",v-bind:height="'100%'")
      .sex(v-bind:data-sex="wxmsg.gender")
      .user_nackname {{wxmsg.name}}
    .entrance.personal_information
      a(v-link="{path: '/setting/information'}") 个人信息
      i.more
    //.entrance.equipment
      a(v-link="{path: '/setting/equipment'}") 设备管理
      i.more
    .entrance.entrance_last.history
      a(v-link="{path: '/setting/history'}") 历史记录
      i.more
    .loadingdiv(v-if="!pageshow" v-bind:data-pageshow = "pageshow")
      loading


</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

    .white
      background #fff
    .bug
      height 0
      color transparent
      opacity 0
    .user_msg
      width 100%
      height 240px
      overflow hidden
      border-bottom 1px solid #d3d3d3
      background-image url("../../assets/images/hdbj.jpg")
      background-size 100% 100%
      .user_faces
        width 100px
        height 100px
        border 5px solid #fff
        background #fff url("../../assets/images/noface.jpg") no-repeat center center /100% 100%
        border-radius 50%
        overflow hidden
        position absolute
        left 15px
        top 85px
        img
          width 102%
          height 102%
          margin -1px
      .sex
        width 22px
        height 22px
        position absolute
        left 132px
        top 139px
        background-size 100% 100%
        background-repeat no-repeat
      [data-sex="male"]
        background-image url("../../assets/images/icon/sex_man.png")
      [data-sex="female"]
        background-image url("../../assets/images/icon/sex_woman.png")
      .user_nackname
        position absolute
        left 160px
        top 135px
        color #000
        text-align center
        font-size 20px
        display inline-block
        min-width 10px
        min-height 10px
    .entrance
      width 95%
      height 50px
      line-height 50px
      border-bottom 1px solid #d3d3d3
      position relative
      color #039dc1
      padding-left 5%
      background #fff
      font-size 14px
      a
        display block
        width 100%
        height 100%
        color #039dc1
      i.more
        display inline-block
        width 20px
        height 20px
        position absolute
        top 52%
        right 15px
        transform translateY(-50%)
        background url("../../assets/images/icon/more_yellow.png") no-repeat center center /100% 100%
      i.white
        background url("../../assets/images/icon/more_white.png") no-repeat center center /100% 100%



</style>
<script>
  var Loading = require('../../../shared/components/loading.vue');

  var api = require('../../../wx/api');
  module.exports = {
    components: {
      'loading': Loading,
      'api': api
    },
    data: function () {
      return {
        wxmsg:{
          "name":" ",
          "headimgurl":" ",
          "gender":"male"//"female"
        },
        pageshow:false

      }
    },
    route:{
      data:function(){
        document.title = "设置";

        var self = this;
        var openid = localStorage.openid;
        if(__DEBUG__){
          var openid = "ozEANuMKQsrGLWXJ4D82louIQeWs";
        }
        //alert(openid);
        api.BluetoothScale.getUserInformation(openid).then(function (data) {
          if(__DEBUG__) {
            console.log(data);
          }
          self.wxmsg.gender=(data.gender=="男"||data.gender=="male"||data.gender-0==1)?"male":"female";//默认是女的
          var headimgurl = data.headimgurl.substring(0,data.headimgurl.length-1)+"132";
          self.wxmsg.headimgurl = headimgurl;
          //self.wxmsg.name = data.name;

          self.wxmsg.name=data.name;
          self.pageshow = true;
           //console.log(self.wxmsg)
        });
      }
    },
    ready:function(){
      document.title = "设置";
    },
    methods:{



    }




  }

</script>
