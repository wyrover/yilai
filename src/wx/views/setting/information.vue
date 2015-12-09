<template lang="jade">
  .main-content.white
    .user_msg
      .user_faces
        img
      .sex(v-bind:data-sex="'male'")
      .user_nackname 微信昵称
    .entrance.user_birthday
      span.user_msg_title 出生日期
      input.setmsg.user_msg_value(type="date" value="1991-12-25")

    .entrance.user_height
      span.user_msg_title 身高(cm)
      input.setmsg.user_msg_value(type="number" value="178")
    .entrance.user_weight
      span.user_msg_title 体重(kg)
      span.user_msg_value 88
    .entrance.entrance_last.target_weight
      span.user_msg_title 目标体重(kg)
      input.setmsg.user_msg_value(type="number" value="60")


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
        width 90px
      .user_msg_value
        position relative
        left 105px
        color #ffad71
        border 0
        min-width 180px
      input[type="date"]
        &::-webkit-inner-spin-button
          visibility hidden
          width 1px
</style>
