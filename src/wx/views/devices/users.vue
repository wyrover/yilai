<template lang="jade">
  .main-content.users.white
    .self_msg(v-for="user in users",v-if="user.openid == selfOpendId")
      .user_img(v-bind:style="'background-image:url('+user.headimgurl+')'")
        img
      span.user_name {{user.nickname}}
    ul
      li.user_list(v-for="user in users",v-show="user.openid !== selfOpendId")
        .user_img(v-bind:style="'background-image:url('+user.headimgurl+')'")
          img
        span.equipment_name {{user.nickname}}
        input.deleteuser_button(value="DELETE",type="button",@click.prevent.stop="reconfirm(user.openid)")
    .loadingdiv(v-if="loadData" v-bind:data-pageshow = "pageshow")
      loading
</template>

<style lang="stylus">
  //@import '../../../../shared/assets/stylus/common'

  .users
    background #f1f1f1
    padding-top 20px
    overflow-y auto
    overflow-x hidden
    .self_msg
      width 100%
      height 80px
      line-height 60px
      color #000
      padding-left 10px
      background #fff
      border-top 1px solid #ccc
      box-sizing border-box
      overflow hidden
      .user_img
        display inline-block
        width 60px
        height 60px
        border-radius 50%
        margin 10px
        background-size 100% 100%
      .user_name
        display inline-block
        height 60px
        font-size 16px
    ul
      li.user_list
        background #fff
        position relative
        height 80px
        line-height 60px
        width 100%
        border-bottom 1px solid #ccc
        color #000
        padding-left 10px
        box-sizing border-box
        overflow hidden
        &:first-child
          border-top 1px solid #ccc
        .user_img
          display inline-block
          width 60px
          height 60px
          border-radius 50%
          margin 10px
          background-size 100% 100%
        .equipment_name
          display inline-block
          height 80px
          line-height 80px
          font-size 16px
        .deleteuser_button
          width 80px
          height 80px
          line-height 82px
          position absolute
          top 0px
          right 0
          background #fd3830
          border 0
          text-align center
          color #fff
          font-size 10px

</style>
<script>

  var Loading = require('../../../shared/components/loading.vue');
  var api = require('../../api');

  module.exports = {
    components: {
      'loading': Loading,
      'api': api
    },
    data: function () {
      return {
        pageshow:false,
        showModal:true,
        selfOpendId:localStorage.openid,
        deviceid:getUrlStr("deviceId"),
        users_openids:[],
        users:[]
      }
    },
    computed:{
      loadData:function(){
        return !this.pageshow
      }
    },
    ready:function(){
      document.title = "已绑定用户";
      var self = this;
      setTimeout(function(){
        self.pageshow=true;
      },10000)
      var deviceid = self.deviceid;
      console.log("deviceid:::::::::::"+deviceid)
      if(__DEBUG__){
        deviceid = "gh_72b6b07b48cb_6dcbc7892ccdca7f697b70aec42bde0d"
      }
      api.device.getDevicesUsers(deviceid).then(function(data){
        if(__DEBUG__){
          console.log(data.user_info);
        }
        self.users=[];
        for(var i = 0 ; i< data.user_info.length;i++){
          if(data.user_info[i].nickname&&data.user_info[i].headimgurl){
            var centerobj={
              nickname:data.user_info[i].nickname,
              headimgurl:data.user_info[i].headimgurl,
              openid:data.user_info[i].openid
            }
            self.users.push(centerobj);
          }

        }
      //   self.users_openids = data.open_id
      //   var openids =  data.open_id;
      //   self.users=[];

      self.pageshow=true;
      })
    },
    methods:{
      reconfirm:function(openid){
        var self = this;
        if(confirm("确定删除该用户吗?")){
          console.log(openid);
          api.device.DeviceUnbindUser(self.deviceid,openid).then(function(status){
            alert(status)
          })
        }
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
