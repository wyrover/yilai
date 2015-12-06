<template lang="jade">
  .main-content
    ul
      li
        .entrance
          //a(v-link="{path: '/setting/'+equipment-id}")
          a(v-link="{path: '/setting/equipment/details'}")
            .equipment_img
              img
            span.equipment_name 亿莱脂肪秤
          i >
      li
        .entrance
          //a(v-link="{path: '/setting/'+equipment-id}")
          a(v-link="{path: '/setting/equipment/details'}")
            .equipment_img
              img
            span.equipment_name 亿莱脂肪秤
          i >
</template>

<style lang="stylus">
  @import '../../../../shared/assets/stylus/common'

  .entrance

      .equipment_img
        display inline-block
        margin 5px
        width 40px
        height 40px
        border-radius 50%
        background blue
      span.equipment_name
        display inline-block
        margin-left 10px
        font-size 17px
</style>
