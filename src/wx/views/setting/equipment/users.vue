<template lang="jade">
  .main-content
    .self_msg
      .user_img
        img
      span.user_name 拉取微信昵称
    ul
      li.user_list
        span.equipment_name 拉取微信昵称
        input.deleteuser_button(value="删除",type="button",@click.prevent.stop="reconfirm")
</template>

<style lang="stylus">
  @import '../../../../shared/assets/stylus/common'

  .main-content
    .self_msg
      width 100%
      height 100px
      line-height 80px
      color #fff
      padding-left 10px
      border-bottom 1px solid #fff
      .user_img
        display inline-block
        width 80px
        height 80px
        border-radius 50%
        background blue
        margin 10px
      .user_name
        display inline-block
        height 80px
    ul
      li.user_list
        position relative
        height 80px
        width 100%
        border-bottom 1px solid #fff
        color #fff
        .equipment_name
          display inline-block
          height 80px
          line-height 80px
          padding-left 10px
        .deleteuser_button
          width 80px
          height 82px
          line-height 82px
          position absolute
          top -1px
          right 0
          background red
          border 0
          text-align center

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
