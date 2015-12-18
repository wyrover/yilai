<template lang="jade">
  .main-content.history_box(v-on:scroll="scrollbottom")
    ul.first_ul.history_ul
      li.date_msg(v-for="statistic in statistics")
        span.data_number(v-if="istoday(statistic.date)") 今天
        span.data_number(v-if="isyesterday(statistic.date)") 昨天
        span.data_number(v-if="!istoday(statistic.date)&&!isyesterday(statistic.date)") {{statistic.date.split(" ")[0].split("-")[1]}}月{{statistic.date.split(" ")[0].split("-")[2]}}日
        //-span.data_number {{statistic.date.split(" ")[0].split("-")[1]}}月{{statistic.date.split(" ")[0].split("-")[2]}}日
        ul.sed_ul(v-on:click="openthis($index)")
          li.time_msg
            .time_number {{statistic.date.split(" ")[1].slice(0,5)}}
            .thistime_information(v-bind:data-open="0")
              span 体重 {{statistic.weight/1000}}kg
              span BMI {{statistic.bmi}}
              i.more
              .weight_percent
                span 脂肪 {{statistic.fat}}%
                span 水分 {{statistic.moisture}}%
                span 骨骼 {{statistic.bone}}%
                span 肌肉 {{statistic.muscle}}%


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
                display inline-block
                height 20px
                width 20px
                position absolute
                right 15px
                top 21px
                transition all ease 0.3s
                transform rotate(0deg) //点击变成90deg
                background url("../../assets/images/icon/more_white.png") no-repeat center center /100% 100%
              .weight_percent
                float left
                span
                  line-height 40px
            [data-open="1"]
               height auto
               .more
                 transform rotate(90deg)



</style>
<script>

  var api = require('../../../wx/api');
  module.exports = {
    components: {
      'api': api
    },
    data: function () {
      return {
        count:99,//最大加载次数
        offset:0,
        showModal:true,
        statistics:[
          {
          "date":"2015-12-16 12:34:56",
          "age":30,
          "height":178,
          "weight":80000,
          "bmi":240,
          "fat":10,
          "moisture":11,
          "muscle":12,
          "bone":13,
          "metabolism":14
          },
          {
          "date":"2015-12-15 13:00:00",
          "age":30,
          "height":178,
          "weight":80000,
          "bmi":241,
          "fat":9,
          "moisture":10,
          "muscle":11,
          "bone":12,
          "metabolism":13
          },
          {
          "date":"2015-11-3 13:00:00",
          "age":30,
          "height":178,
          "weight":80000,
          "bmi":241,
          "fat":9,
          "moisture":10,
          "muscle":11,
          "bone":12,
          "metabolism":13
          },
          {
          "date":"2015-11-4 13:00:00",
          "age":30,
          "height":178,
          "weight":81.0,
          "bmi":241,
          "fat":9,
          "moisture":10,
          "muscle":11,
          "bone":12,
          "metabolism":13
          },
          {
          "date":"2015-11-05 13:00:00",
          "age":30,
          "height":178,
          "weight":81.0,
          "bmi":241,
          "fat":9,
          "moisture":10,
          "muscle":11,
          "bone":12,
          "metabolism":13
          },
          {
          "date":"2015-11-6 13:00:00",
          "age":30,
          "height":178,
          "weight":81.0,
          "bmi":241,
          "fat":9,
          "moisture":10,
          "muscle":11,
          "bone":12,
          "metabolism":13
          },
          {
          "date":"2015-11-7 13:00:00",
          "age":30,
          "height":178,
          "weight":81.0,
          "bmi":241,
          "fat":9,
          "moisture":10,
          "muscle":11,
          "bone":12,
          "metabolism":13
          },
          {
          "date":"2015-11-8 13:00:00",
          "age":30,
          "height":178,
          "weight":81.0,
          "bmi":241,
          "fat":9,
          "moisture":10,
          "muscle":11,
          "bone":12,
          "metabolism":13
          },
          {
          "date":"2015-11-9 13:00:00",
          "age":30,
          "height":178,
          "weight":81.0,
          "bmi":241,
          "fat":9,
          "moisture":10,
          "muscle":11,
          "bone":12,
          "metabolism":13
          },
          {
          "date":"2015-11-10 13:00:00",
          "age":30,
          "height":178,
          "weight":81.0,
          "bmi":241,
          "fat":9,
          "moisture":10,
          "muscle":11,
          "bone":12,
          "metabolism":13
          },
          {
          "date":"2015-11-11 13:00:00",
          "age":30,
          "height":178,
          "weight":81.0,
          "bmi":241,
          "fat":9,
          "moisture":10,
          "muscle":11,
          "bone":12,
          "metabolism":13
          },
          {
          "date":"2015-11-12 13:00:00",
          "age":30,
          "height":178,
          "weight":81.0,
          "bmi":241,
          "fat":9,
          "moisture":10,
          "muscle":11,
          "bone":12,
          "metabolism":13
          }
        ]
      }
    },

    ready:function(){
      document.getElementsByClassName("thistime_information")[0].setAttribute("data-open",1);//默认打开第一条
    },

    route:{
      data:function(){
        document.title = "历史记录";
        var self = this;

        var postobj={"count":30,"offset":0};

        api.BluetoothScale.getMultiData(postobj).then(function(data,status){
          if(__DEBUG__){
            console.log(data)
          }
          self.offset+=postobj.count;

          var centerdata=data;
          /***************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 start***************/
          for(var i=0;i<centerdata.length;i++){
            console.log(centerdata[i].time.split("").length)
            if(centerdata[i].time.split("").length==10){
              centerdata[i].time+=" 00:00:00";//兼容后端返回的数据只有日期没有时间
              centerdata[i].date = centerdata[i].time;
            }
          }
          /**************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 end*****************/
          self.statistics = centerdata;
        })
      }
    },

    methods:{

      openthis:function(num){
        var thistime_information = document.getElementsByClassName("thistime_information")[num];
        if(thistime_information.getAttribute("data-open")=="1"){
          thistime_information.setAttribute("data-open","0");
        }else{
          thistime_information.setAttribute("data-open","1");
        }
      },
      istoday:function(date){
        if (new Date().toLocaleString().split(" ")[0]==new Date(date).toLocaleString().split(" ")[0]) {
          return 1
        }else{
          return 0
        }
      },
      isyesterday:function(date){
        if (new Date(new Date()-86400000).toLocaleString().split(" ")[0]===new Date(date).toLocaleString().split(" ")[0]) {
          return 1
        }else{
          return 0
        }
      },
      scrollbottom:function(){
        var self = this;
        var history_box=document.getElementsByClassName("history_box")[0];
        var history_ul=document.getElementsByClassName("history_ul")[0];
        if(history_box.scrollTop>=history_ul.clientHeight-history_box.clientHeight){
          var centerarr=[
            {
            "date":"2015-12-1 12:34:56",
            "age":30,
            "height":178,
            "weight":80.0,
            "bmi":240,
            "fat":10,
            "moisture":11,
            "muscle":12,
            "bone":13,
            "metabolism":14
            },
            {
            "date":"2015-11-2 13:00:00",
            "age":30,
            "height":178,
            "weight":81.0,
            "bmi":241,
            "fat":9,
            "moisture":10,
            "muscle":11,
            "bone":12,
            "metabolism":13
            }
          ];
          if(self.count>0){
            self.count--;
            var postobj={"count":30,"offset":self.offset};
            self.offset+=postobj.count
              console.log(self.offset)
            api.BluetoothScale.getMultiData(postobj).then(function(data,status){
              if(__DEBUG__){
                console.log(data)
              }
              self.offset+=postobj.count;

              var centerdata=data;
              /***************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 start***************/
              for(var i=0;i<centerdata.length;i++){
                console.log(centerdata[i].time.split("").length)
                if(centerdata[i].time.split("").length==10){
                  centerdata[i].time+=" 00:00:00";//兼容后端返回的数据只有日期没有时间
                  centerdata[i].date = centerdata[i].time;
                }
              }
              /**************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 end*****************/
              self.statistics.concat(centerdata);
            })
          }

        }
      }

    }




  }

</script>
