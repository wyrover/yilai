<template lang="jade">
  .main-content.history_box
    ul.first_ul
      li.date_msg(v-on:click="openthis(0)")
        span.data_number 今天
        ul.sed_ul
          li.time_msg
            .time_number 15:26
            .thistime_information
              span 体重75.0kg
              span BMI 24.1
              i.more >
              .weight_percent
              span 脂肪 24.1%
              span 水分 67.2%
              span 骨骼 7.9kg
              span 肌肉 34.1%
      li.date_msg(v-on:click="openthis(1)")
        span.data_number 昨天
        ul.sed_ul
          li.time_msg
            .time_number 15:26
            .thistime_information
              span 体重75.0kg
              span BMI 24.1
              i.more >
              .weight_percent
              span 脂肪 24.1%
              span 水分 67.2%
              span 骨骼 7.9kg
              span 肌肉 34.1%
      li.date_msg(v-on:click="openthis(2)")
        span.data_number 11月18日
        ul.sed_ul
          li.time_msg
            .time_number 15:26
            .thistime_information
              span 体重75.0kg
              span BMI 24.1
              i.more >
              .weight_percent
              span 脂肪 24.1%
              span 水分 67.2%
              span 骨骼 7.9kg
              span 肌肉 34.1%


</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'
  .history_box
    padding-top 20px
    color #fff
    font-size 16px
    ul.first_ul
      padding-left 70px
      li.date_msg
        clearfix()
        width:100%
        line-height 60px
        border-bottom 1px solid #fff
        position relative
        transition all ease 0.5s
        &:first-child
           border-top 1px solid #fff
        //overflow hidden
        .data_number
          width 60px
          height 13px
          line-height 13px
          padding-right 10px
          font-size 11px
          text-align right
          position absolute
          left -70px
          top -8px
        ul.sed_ul
          li.time_msg
            position relative
            .time_number
              width 60px
              line-height 60px
              padding-right 10px
              font-size 18px
              text-align right
              position absolute
              left -70px
            .thistime_information
              overflow hidden
              height 60px //点击变成auto
              clearfix()
              span
                display block
                float left
                width 40%
                line-height 60px
                padding 0 10px
              .more
               height 60px
               line-height 60px
               position absolute
               right 15px
               transition all ease 0.3s
               transform rotate(0deg) //点击变成90deg
            [data-open="true"]
               height auto
               .more
                 transform rotate(90deg)



</style>
<script>

  module.exports = {

    data: function () {
      return {
        showModal:true
      }
    },


    methods:{

      openthis:function(num){
        var test = document.getElementsByClassName("thistime_information")[num];
        if(test.attributes["data-open"]){
          if(test.getAttribute("data-open")=="true"){
            test.setAttribute("data-open",false);
          }else{
            test.setAttribute("data-open",true);
          }
        }else{
          test.setAttribute("data-open",true);
        }
      }

    }




  }

</script>
