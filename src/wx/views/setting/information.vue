<template lang="jade">
  .main-content.white
    .user_msg
      .user_faces
        img
      .sex
      .user_nackname 微信昵称
    .entrance.user_birthday
      span.user_msg_title 出生年月日
      span.user_msg_value 1991年12月1日
    .entrance.user_height
      span.user_msg_title 身高
      span.user_msg_value 178cm
    .entrance.user_weight
      span.user_msg_title 体重
      span.user_msg_value 88kg
    .entrance.entrance_last.target_weight
      span.user_msg_title 目标体重
      span.user_msg_value 78kg


</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

    .entrance
      span
        display block
        height 100%
        overflow hidden
        position absolute
      .user_msg_title
        width 100px
      .user_msg_value
        left 115px
        color #ffad71
</style>
