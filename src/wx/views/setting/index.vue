<template lang="jade">
  .main-content
    .user_msg
      .user_faces
        img
      .user_nackname 微信昵称
    .entrance.personal_information
      a(v-link="{path: '/setting/information'}") 个人信息
      i >
    .entrance.equipment
      a(v-link="{path: '/setting/equipment'}") 设备管理
      i >
    .entrance.entrance_last.history
      a(v-link="{path: '/setting/history'}") 历史记录
      i >


</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'


    .user_msg
      width 100%
      height 200px
      overflow hidden
      border-bottom 1px solid #fff
      .user_faces
        width 100px
        height 100px
        background blue
        border-radius 50%
        overflow hidden
        position absolute
        left 10px
        top 10px
        //img
      .user_nackname
        color #eee
        text-align center
    .entrance
      width 95%
      height 50px
      line-height 50px
      border-bottom 1px solid #fff
      position relative
      color #fff
      padding-left 5%
      a
        display block
        width 100%
        height 100%
        color #fff
      i
        position absolute
        top 0
        right 15px
        color #fff



</style>
