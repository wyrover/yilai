<template lang="jade">
  .main-content.details
    .device_msg
      .device_faces
        img(v-bind:src="'http://test.xlink.cn/yilai/wx/images/'+deviceid+'.png'" width="100%" height="100%")
      .device_name 亿莱脂肪秤
    .list
      .entrance.personal_information
        a(v-link="{path: '/setting/equipment/'+deviceid+'/users'}")
          span.personal_information_title 用 户
          span.personal_information_value {{usersNum}}人
          i.more.white
      .entrance.equipment
        a(v-link="{path: '/setting/equipment/details/help'}")
          span.personal_information_title 使用帮助
          i.more.white
    .delete_device
      input.delete_button(value="删除设备",type="button",@click.prevent.stop="reconfirm")
      //.reconfirm(v-show="showModal")


</template>

<style lang="stylus">
  @import '../../../../shared/assets/stylus/common'

  .details
    .device_msg
      width 100%
      height 200px
      overflow hidden
      .device_faces
        width 100px
        height 100px
        overflow hidden
        margin 20px auto
        //img
      .device_name
        color #eee
        text-align center
    .list
      padding-left 20px
      .entrance
        width 100%
        background none
        padding 0
        color #fff
        height 50px
        line-height 50px
        &:first-child
          border-top 1px solid #fff
        a
          color #fff
          .personal_information_value
            position absolute
            right 50px
            line-height 51px


    .delete_device
      width 180px
      height 40px
      margin 50px auto
      overflow hidden
      .delete_button
        width 100%
        height 100%
        border 1px solid #fff
        background #ffa96f
        color #fff
        border-radius 20px
        line-height 36px


</style>

<script>

  var api = require('../../../api');

  module.exports = {
    components: {
      'api': api
    },
    data: function () {
      return {
        deviceid:window.location.href.split("setting/equipment/")[1].split("?")[0],
        showModal:true,
        usersNum:3
      }
    },
    route:{
      data:function(){
        document.title = "设备详情";
        var self = this;

        var deviceid = window.location.href.split("setting/equipment/")[1].split("?")[0];


        if(__DEBUG__){
          deviceid = "001"
        }
        api.device.getDevicesUsers(deviceid).then(function(data){
          if(__DEBUG__){
            console.log(data);
          }
          self.usersNum = data.open_id.length
          console.log("获取到的用户个数"+self.usersNum)


        })
      }
    },
    methods:{
      reconfirm:function(){
        if(confirm("确定删除该设备吗?")){
          var deviceid = window.location.href.split("setting/equipment/")[1].split("?")[0];
          var openid = loacalStroage.openid;
          api.device.DeviceUnbindUser(deviceid,openid).then(function(status){
            if(__DEBUG__){
              console.log(status);
            }
            alert(status)
          })
        }
      }
    }
  }



</script>