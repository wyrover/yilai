<template lang="jade">
  .main-content.white
    .user_msg
      .user_faces
        img
      .sex
      span.user_nackname 微信昵称
    .entrance.personal_information
      a(v-link="{path: '/setting/information'}") 个人信息
      i.more >
    .entrance.equipment
      a(v-link="{path: '/setting/equipment'}") 设备管理
      i.more >
    .entrance.entrance_last.history
      a(v-link="{path: '/setting/history'}") 历史记录
      i.more >


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
        background blue
        border-radius 50%
        overflow hidden
        position absolute
        left 15px
        top 85px
        //img
      .sex
        width 30px
        height 30px
        background pink
        position absolute
        left 128px
        top 136px
        color #000
      .user_nackname
        position absolute
        left 160px
        top 135px
        color #000
        text-align center
    .entrance
      width 95%
      height 40px
      line-height 40px
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
        position absolute
        top 0
        right 15px
        color #ffa96f



</style>
