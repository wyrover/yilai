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
      a(v-link="{path: '/setting'}") 设备管理
      i >
    .entrance.entrance_last.history
      a(v-link="{path: '/setting'}") 历史记录
      i >


</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'



</style>
