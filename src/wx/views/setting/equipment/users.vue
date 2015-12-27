<template lang="jade">
  .main-content.users.white
    .self_msg
      .user_img
        img
      span.user_name 拉取微信昵称
    ul
      li.user_list(v-for="user in users")
        .user_img
          img
        span.equipment_name {{user.name}}
        input.deleteuser_button(value="DELETE",type="button",@click.prevent.stop="reconfirm(user.openid)")
</template>

<style lang="stylus">
  @import '../../../../shared/assets/stylus/common'

  .users
    background #f1f1f1
    padding-top 20px
    .self_msg
      width 100%
      height 80px
      line-height 60px
      color #000
      padding-left 10px
      background #fff
      border-top 1px solid #ccc
      .user_img
        display inline-block
        width 60px
        height 60px
        border-radius 50%
        background blue
        margin 10px
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
        &:first-child
          border-top 1px solid #ccc
        .user_img
          display inline-block
          width 60px
          height 60px
          border-radius 50%
          background blue
          margin 10px
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
          right 10px
          background #fd3830
          border 0
          text-align center
          color #fff
          font-size 10px

</style>
<script>

  var api = require('../../../api');

  module.exports = {
    components: {
      'api': api
    },
    data: function () {
      return {
        showModal:true,
        //selfOpendId:(window.localStrage.openid)?window.localStrage.openid:"",
        deviceid:window.location.href.split("setting/equipment/")[1].split("/users")[0],
        users_openids:[],
        users:[
          {
            openid:"",
            headimgurl:"",
            name:""
          }
        ]
      }
    },
    route:{
      data:function(){
        document.title = "已绑定用户";
        var self = this;

        var deviceid = self.deviceid;
        console.log("deviceid:::::::::::"+deviceid)
        if(__DEBUG__){
          deviceid = "0001"
        }
        api.device.getDevicesUsers(deviceid).then(function(data){
          if(__DEBUG__){
            console.log(data);
          }
          self.users_openids = data.open_id
          var openids =  data.open_id
          for(var i=0;i<data.open_id.length;i++){
            api.BluetoothScale.getUserInformation(openids[i]).then(function (data) {
              if(__DEBUG__) {
                console.log(data);
              }
              self.users.headimgurl = data.headimgurl;
              self.users.name = data.name;
            });
          }

        })
      }
    },
    methods:{
      reconfirm:function(openid){
        if(confirm("确定删除该用户吗?")){
          console.log(openid);
        }
      }
    }
  }



</script>
