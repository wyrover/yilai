<template lang="jade">
  .main-content.details
    .device_msg
      .device_faces
        img
      .device_name 亿莱脂肪秤
    .list
      .entrance.personal_information
        a(v-link="{path: '/setting/equipment/details/users'}") 用 户
        i.more 2人 >
      .entrance.equipment
        a(v-link="{path: '/setting/equipment/details/help'}") 使用帮助
        i.more >
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
        background blue
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
        a,.more
          color #fff


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