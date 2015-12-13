<template lang="jade">
  .main-content
    ul.equipment_list
      li
        .entrance
          //a(v-link="{path: '/setting/'+equipment-id}")
          a(v-link="{path: '/setting/equipment/details'}")
            .equipment_img
              img(src="../../../assets/images/icon/zhifangcheng.png" width="100%" height="100%")
            span.equipment_name 亿莱脂肪秤
            i.more
      li
        .entrance
          //a(v-link="{path: '/setting/'+equipment-id}")
          a(v-link="{path: '/setting/equipment/details'}")
            .equipment_img
              img(src="../../../assets/images/icon/zhifangcheng.png" width="100%" height="100%")
            span.equipment_name 亿莱脂肪秤
            i.more
</template>

<style lang="stylus">
  @import '../../../../shared/assets/stylus/common'

  ul.equipment_list
    padding-top 30px
    padding-left 20px
    li
      border-bottom 1px solid #fff
      &:first-child
        border-top 1px solid #fff
      .entrance
        background none
        padding-left 0
        border 0
        height 60px
        line-height 60px
        a
          .equipment_img
            display inline-block
            margin 10px
            width 40px
            height 40px
          span.equipment_name
            display inline-block
            margin-left 10px
            font-size 17px
            color #fff
          .more
            color #fff
            background-image url("../../../assets/images/icon/more_white.png")


</style>
<script>
  //var wxauth = require('../../../assets/js/wxauth');
  var api = require('../../../api');

  module.exports = {
    components: {
      'api': api
    },

    data: function () {
      return {

      };
    },
    route:{
      data:function(){
      }
    },
    methods: {

    }
  };
</script>
