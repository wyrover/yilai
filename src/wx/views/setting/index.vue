<template lang="jade">
  .main-content.white
    .user_msg
      .user_faces
        img(v-bind:src="wxmsg.face",v-bind:width="'100%'",v-bind:height="'100%'")
      .sex(v-bind:data-sex="wxmsg.gender")
      span.user_nackname {{wxmsg.name}}
    .entrance.personal_information
      a(v-link="{path: '/setting/information'}") 个人信息
      i.more
    //-.entrance.equipment
      a(v-link="{path: '/setting/equipment'}") 设备管理
      i.more
    .entrance.entrance_last.history
      a(v-link="{path: '/setting/history'}") 历史记录
      i.more


</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

    .white
      background #fff
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
        color #000
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

  var api = require('../../../wx/api');
  module.exports = {
    components: {
      'api': api
    },
    data: function () {
      return {
        wxmsg:{
          "name":"测试微信昵称",
          "face":"http://img.wdjimg.com/mms/icon/v1/9/d4/22884940c69ffbe02cb97c52d7e60d49_256_256.png",
          "gender":"male"//"female"
        }

      }
    },

    route:{
      data:function(){
        document.title = "设置";
      }
    },

    methods:{



    }




  }

</script>
