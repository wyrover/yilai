<template lang="jade">
  .main-content
    .device_msg
      .device_faces
        img
      .device_name 亿莱脂肪秤
    .entrance.personal_information
      a(v-link="{path: '/setting/equipment/details/users'}") 用户
      i 2人 >
    .entrance.equipment
      a(v-link="{path: '/setting/equipment/details/help'}") 使用帮助
      i >
    .delete_device
      input.delete_button(value="删除设备",type="button",@click.prevent.stop="reconfirm")
    //.reconfirm(v-show="showModal")


</template>

<style lang="stylus">
  @import '../../../../shared/assets/stylus/common'


    .device_msg
      width 100%
      height 200px
      overflow hidden
      border-bottom 1px solid #fff
      .device_faces
        width 100px
        height 100px
        background blue
        border-radius 50%
        overflow hidden
        margin 20px auto
        //img
      .device_name
        color #eee
        text-align center
    .delete_device
      width 180px
      height 40px
      border 1px solid #aaa
      margin 50px auto
      overflow hidden
      .delete_button
        width 100%
        height 100%


</style>

<script>

  module.exports = {

    data: function () {
      return {
        showModal:true
      }
    },
    methods:{
      reconfirm:function(){
        if(confirm("确定删除该设备吗?")){
          console.log(123);
        }
      }
    }
  }



</script>