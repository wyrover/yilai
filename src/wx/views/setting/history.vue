<template lang="jade">
  .main-content.history_box(v-on:scroll="scrollbottom")
    ul.first_ul.history_ul
      li.date_msg(v-for="statistic in statistics")
        span.data_number(v-if="istoday(statistic.date)") 今天
        span.data_number(v-if="isyesterday(statistic.date)") 昨天
        span.data_number(v-if="!istoday(statistic.date)&&!isyesterday(statistic.date)") {{statistic.date.split(" ")[0].split("/")[1]}}月{{statistic.date.split(" ")[0].split("/")[2]}}日
        //-span.data_number {{statistic.date.split(" ")[0].split("-")[1]}}月{{statistic.date.split(" ")[0].split("-")[2]}}日
        ul.sed_ul(v-on:click="openthis($index)")
          li.time_msg
            .time_number {{statistic.date.split(" ")[1].slice(0,5)}}
            .thistime_information(v-bind:data-open="0")
              span 体重 {{statistic.weight/1000}}kg
              span BMI {{Math.round(statistic.bmi*10)/10}}
              i.more
              .weight_percent
                span 脂肪 {{statistic.fat/10}}%
                span 水分 {{statistic.moisture/10}}%
                span 肌肉 {{statistic.muscle/10}}%
                span 骨骼 {{statistic.bone/10}}kg
                span 体内脂肪 {{statistic.internal_fat}}
                span 体内年龄 {{statistic.internal_age}}岁
                span(v-bind:style="'width:80%'") 基本代谢 {{statistic.metabolism}}kcal
    .nodata(v-if="statistics.length==0") 暂无数据


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
                  font-size 14px

            [data-open="1"]
               height auto
               .more
                 transform rotate(90deg)
    .nodata
      text-align center



</style>
<script>

  var api = require('../../../wx/api');
  module.exports = {
    components: {
      'api': api
    },
    data: function () {
      return {
        count:999,//最大加载次数
        canload:true,//是否允许加载
        offset:0,//默认偏移量
        firGetCount:29,//首次加载的数量 不要超过30
        reGetCount:29,//每次拉到底部加载的数量
        showModal:true,
        statistics:[]
      }
    },

    ready:function(){
      //document.getElementsByClassName("thistime_information")[0].setAttribute("data-open",1);//默认打开第一条
    },

    route:{
      data:function(){
        document.title = "历史记录";
        var self = this;

        var postobj={"count":self.firGetCount,"offset":0};
        if(__DEBUG__){
          localStorage.openid = "ozEANuMKQsrGLWXJ4D82louIQeWs";
        }

        api.BluetoothScale.getMultiData(postobj,localStorage.openid).then(function(data,status){
          if(__DEBUG__){
            console.log(data)
          }

          self.canload =( data.length==postobj.count);
          self.offset+=postobj.count;

          var centerdata=data;

          /***************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 start***************/
          for(var i=0;i<centerdata.length;i++){
            centerdata[i].bmi = centerdata[i].weight/1000/((centerdata[i].height/100)*(centerdata[i].height/100))
            var centertime = new Date(centerdata[i].time)
            var date = new Date(centerdata[i].time).getFullYear()+"/"+(new Date(centerdata[i].time).getMonth()+1)+"/"+new Date(centerdata[i].time).getDate();
            var hours = (new Date(centerdata[i].time).getHours()>9)?new Date(centerdata[i].time).getHours():"0"+new Date(centerdata[i].time).getHours()
            var minutes = (new Date(centerdata[i].time).getMinutes()>9)?new Date(centerdata[i].time).getMinutes():"0"+new Date(centerdata[i].time).getMinutes()
            centerdata[i].date =date+" "+hours+":"+minutes;
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
        if((history_box.scrollTop>=history_ul.clientHeight-history_box.clientHeight)&&self.canload){
          self.canload = false;
          var centerarr=[];
          if(self.count>0){
            self.count--;
            var postobj={"count":self.reGetCount,"offset":self.offset};
            console.log(postobj.offset)
            self.offset+=postobj.count
            if(__DEBUG__){
              localStorage.openid = "ozEANuMKQsrGLWXJ4D82louIQeWs";
            }

            api.BluetoothScale.getMultiData(postobj,localStorage.openid).then(function(data,status){

              if(__DEBUG__){
                console.log(data)
              }
              //alert(self.canload)
              self.canload = (data.length ==postobj.count);
              //alert("偏移量"+postobj.offset)
              //alert("返回的数据长度："+data.length +"请求的数据长度："+postobj.count)
              self.offset+=postobj.count;

              var centerdata=data;
              /***************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 start***************/
              for(var i=0;i<centerdata.length;i++){
                centerdata[i].bmi = centerdata[i].weight/1000/((centerdata[i].height/100)*(centerdata[i].height/100))
                var centertime = new Date(centerdata[i].time)
                var date = new Date(centerdata[i].time).getFullYear()+"/"+(new Date(centerdata[i].time).getMonth()+1)+"/"+new Date(centerdata[i].time).getDate();
                var hours = (new Date(centerdata[i].time).getHours()>9)?new Date(centerdata[i].time).getHours():"0"+new Date(centerdata[i].time).getHours()
                var minutes = (new Date(centerdata[i].time).getMinutes()>9)?new Date(centerdata[i].time).getMinutes():"0"+new Date(centerdata[i].time).getMinutes()
                centerdata[i].date =date+" "+hours+":"+minutes;
              }
              /**************兼容后端返回的数据只有日期没有时间，同时兼容后端返回的时间字段和文档不同 end*****************/
              self.statistics = self.statistics.concat(centerdata);
              if(__DEBUG__){
                console.log(self.statistics)
              }

            })
          }

        }
      }

    }




  }

</script>
