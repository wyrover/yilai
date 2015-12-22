<template lang="jade">
  .main-content.chart_page
    .date_switch
      .fir_datetype
        .datetype_box.week#weekbox(v-on:click.prevent.stop="selectedweek('weekbox')",v-bind:data-name="'week'") 周
        .datetype_box.month#monthbox.selected(v-on:click.prevent.stop="selectedmonth('monthbox')",v-bind:data-name="'month'") 月
        .datetype_box.year#yearbox(v-on:click.prevent.stop="selectedyear('yearbox')",v-bind:data-name="'year'") 年
      .sed_datetype
        i.pointer_left(v-on:click.prevent.stop="prevdate") &lt;
        span.sed_datetext(v-bind:firstdate="",v-bind:lastdate="") {{showseddate}}
        i.pointer_right(v-on:click.prevent.stop="nextdate") &gt;
      .chart_box
        //y坐标轴
        //.coordinateY
          li.coordinateYli(v-for="coordinateYtext in coordinateYtexts | orderBy 'coordinateYtext' -1")
            span.coordinateYtext {{coordinateYtext}}
            i.line

        .chart_canvas
          svg.svg#svg1(v-bind:width="'100%'",v-bind:height="'185px'")
            defs
              linearGradient#linearGradient-1(v-bind:x1="'0%'",v-bind:y1="'100%'",v-bind:x2="'100%'",v-bind:y2="'100%'")
                stop(v-bind:stop-color="'#f4f4d3'",v-bind:offset="'0%'")
                stop(v-bind:stop-color="'#87f196'",v-bind:offset="'40%'")
                stop(v-bind:stop-color="'#f1c587'",v-bind:offset="'78%'")
                stop(v-bind:stop-color="'#dbdb0b'",v-bind:offset="'100%'")
              linearGradient#linearGradient-2(v-bind:x1="'0'",v-bind:y1="'100%'",v-bind:x2="'0'",v-bind:y2="'0'")
                stop(v-bind:stop-color="'#ffffa4'",v-bind:stop-opacity="0.05",v-bind:offset="'0%'")
                //stop(v-bind:stop-color="'#ffffa4'",v-bind:offset="'33%'")
                //stop(v-bind:stop-color="'#dbdb0b'",v-bind:offset="'66%'")
                stop(v-bind:stop-color="'#ffffa4'",v-bind:stop-opacity="0.3",v-bind:offset="'100%'")
            g#Page_0(stroke="none" stroke-width="1" fill="none")
              path.acreages(v-bind:d="acreages",v-bind:fill="'url(#linearGradient-2)'",v-bind:stroke-width="0")
            g#Page_1(stroke="none" stroke-width="1" fill="none")
              path#points_path.path(v-bind:d="d",v-bind:stroke="'url(#linearGradient-1)'",v-bind:stroke-width="3",v-bind:data-odd="'first'")
            g#Page_2(v-bind:stroke="none",v-bind:stroke-width="1",v-bind:fill="'#ffffa4'")
              circle.point_circle(v-for="point in points",v-bind:cx="point.split(',')[0]",v-bind:cy="point.split(',')[1]",v-bind:r="5",v-bind:fill="'#ffffa4'")
          .trigger
            .trigger_box.opacity(v-for="point in points",v-bind:style="'left:'+point.split(',')[0]+'px;top:'+point.split(',')[1]+'px'",v-on:click.prevent.stop="valueshow($index)")
              .trigger_circle
              .value_box
                span.trigger_value_number
                span.value_unit {{unit}}


        .coordinateX
          span.coordinateX_date(v-for="coordinateX in coordinateXs",track-by="$index",v-bind:style="'width:'+100/coordinateXs.length+'%'") {{coordinateX}}
    .type_switch
      ul.type_switch_ul
        li.date_type.weight.selected#weightbutton(v-on:click.prevent.stop="selectedweight('weightbutton')",v-bind:data-name="'weight'")
          .divbotton.weighticon
            span 体重
        li.date_type.bmi#bmibutton(v-on:click.prevent.stop="selectedbmi('bmibutton')",v-bind:data-name="'bmi'")
          .divbotton.bmiicon
            span BMI
        li.date_type.fat#fatbutton(v-on:click.prevent.stop="selectedfat('fatbutton')",v-bind:data-name="'fat'")
          .divbotton.faticon
            span 脂肪率


</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'

  .chart_page
    width 100%
    height 100%
    overflow hidden
    font-size 16px
    color #fff
    .date_switch
      width 100%
      position relative
      .fir_datetype
        width 93%
        height 40px
        margin 0 auto
        line-height 40px
        .datetype_box
          margin-top 6px
          display inline-block
          width 32.5%
          height 28px
          line-height 26px
          background transparent
          text-align center
          border 1px solid #fff
          transition all ease 0.3s
        .week
          border-radius 5px 0 0 5px
        .year
          border-radius 0 5px 5px 0
        .selected
          background #fff
          color #03b1c4
      .sed_datetype
        width auto
        height 30px
        line-height 30px
        position relative
        margin 8px auto
        padding 0 15px
        text-align center
        i
          display inline-block
          width 30px
          height 30px
          margin 0 10px
          transition all ease 0.3s
      .chart_box
        width 100%
        height 219px
        overflow hidden
        .coordinateY
          width 100%
          height 220px
          position absolute
          overflow hidden
          z-index 0
          .coordinateYli
            height 20%
            width 100%
            list-style none
            position relative
            top 10px
            .coordinateYtext
              display inline-block
              width 25px
              height 100%
              font-size 12px
              text-align center
              position relative
            i.line
              height 0
              width 100%
              margin-left 25px
              display inline-block
              border-bottom 1px solid #fff
              position relative
              top -50px
              opacity 0.2
        .chart_canvas
          width 100%
          height 185px
          position relative
          #svg1
            perspective 800px
            position absolute
            .acreages
              //transition all ease 0.5s
              transform translateY(20px)
              //opacity 0.3
              animation acreages 0.8s ease forwards
              animation-iteration-count 1
              animation-delay 0s
            .path
              transition all ease 0.3s
              stroke-dasharray 1000
              stroke-dashoffset 1000
              animation dash 2s ease forwards
              animation-iteration-count 1
              animation-delay 0.5s
            [data-odd="true"]
              animation dash 2s ease forwards
              animation-delay 0s
            [data-odd="false"]
              animation dash1 2s ease forwards
              animation-delay 0s
            .point_circle
              ransition all ease 0.3s
              opacity 0
              animation pointcircle 1s ease forwards
              animation-iteration-count 1
              animation-delay 0s
          .trigger
            width 100%
            height 185px
            position absolute
            top 0
            .trigger_box
              transition all ease 0.4s
              width 22px
              height 22px
              margin -11px 0 0 -11px
              position absolute
              .trigger_circle
                position absolute
                top 50%
                left 50%
                margin -8px 0 0 -8px
                width 16px
                height 16px
                border-radius 50%
                background #ffffa4
                box-shadow 0 0 4px 1px rgba(255,255,255,0.5)
              .value_box
                width auto
                height 15px
                line-height 15px
                padding 6px
                position absolute
                top -35px
                left 50%
                transform translate(-50%)
                background #6adde2
                border-radius 6px
                &:after
                  content " "
                  width 0
                  height 0
                  border-top 6px solid #6adde2
                  border-left 6px solid transparent
                  border-right 6px  solid transparent
                  position absolute
                  left 50%
                  top 98%
                  margin-left -6px
                span
                 color #ffffa4
                 font-size 15px
              &:first-child
                .value_box
                  left 125%
                  &:after
                    left 22%
              &:last-child
                .value_box
                  left -31%
                  &:after
                    left 80%
            .opacity
              opacity 0
        .coordinateX
          width 100%
          height 30px
          border-top 1px solid #fff
          border-bottom 1px solid #fff
          .coordinateX_date
            display inline-block
            height 30px
            line-height 30px
            text-align center
            font-size 12px
            width 20%
    .type_switch
      width 100%
      .type_switch_ul
        .date_type
          display inline-block
          width 24%
          height 75px
          margin-left 7%
          margin-top 20px
          border-radius 10px
          overflow hidden
          transition all ease 0.3s
          .divbotton
            width 100%
            height 100%
            border-radius 10px
            background red
            text-align center
            span
              position relative
              top 45px
          .weighticon
            background url("../../assets/images/icon/tizhong.png") no-repeat center 10px
          .bmiicon
            background url("../../assets/images/icon/BMI.png") no-repeat center 10px
          .faticon
            background url("../../assets/images/icon/zhifang.png") no-repeat center 10px
        .selected
          background #fff
          color #41b8a1
          .weighticon
            background url("../../assets/images/icon/tizhong_selected.png") no-repeat center 10px
          .bmiicon
            background url("../../assets/images/icon/BMI_selected.png") no-repeat center 10px
          .faticon
            background url("../../assets/images/icon/zhifang_selected.png") no-repeat center 10px

  @keyframes dash {

    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes dash1 {

    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes pointcircle {
    to {
      opacity 1
    }
  }
  @keyframes acreages{
      to {
      transform translateY(0)
      //opacity 0.8
    }
  }
</style>
<script>
  var datetools = require('../chart/datetool');
  var updataPointNum = require('../chart/updataPointNum');//获取数据，更新self.pointnum
  var api = require('../../../wx/api');



  module.exports = {
    components: {
      'api': api,
      'datetool': datetools,
      'updataPointNum': updataPointNum
    },
    data: function () {
      return {
        d:"",//存放曲线的路径 是个字符串
        points:[],//实际渲染的坐标点
        pointnum:["0","1","0","0","0",0],//画布绘制的根据这里的数字绘制曲线  自动上下居中 自动计算差值 数值为0自动跳过
        showvalues:[],//手指点击后要显示的数值
        acreages:"",//存放绘制渐变图案的面的路径，是个字符串
        coordinateXs:["0~5","5~15","15~20","5~15","15~20"],
        showseddate:"",//存放当前可以左右选择的日期内容
        unit:"kg",//存放当前的单位
        coordinateYtexts:["1kg","7kg","3kg","4kg","5kg"],//纵坐标内容
        post_daydate:{
          "end_date":"2015-11-11",
          "days":7,
          "avg":true
        },
        post_monthdate:{
           "end_date":"2015-11-11",
           "days":30,
           "avg_days":5
        },
        post_yeardate:{
            "year":"2015"
        },
        updataSVG:function(self){//更新svg的内容
          resetAnimation();//重置动画
          self.d=pointToD(self.pointnum).path;//重置数值 线

          self.points=pointToD(self.pointnum).points;//重置数值  点

          self.acreages=pointToD(self.pointnum).acreages;//重置数值  面

          function resetAnimation(){
            if($("#points_path").attr("data-odd")=="false"){
              $("#points_path").attr("data-odd","true")
            }else{
              $("#points_path").attr("data-odd","false")
            }
          }
          function pointToD(pointarr){
            var svg_slope = 70;//变化坡度大小 可以选择0到100之间的数字
            var newpointarr = [];
            console.log(pointarr)
            for(var i=0;i<pointarr.length;i++){
              if(pointarr[i]-0>0){
                var max = pointarr[i]-0;
                var min = pointarr[i]-0;
                for(var i=1;i<pointarr.length;i++){
                  if(pointarr[i]-0>0){
                    if(max<pointarr[i]-0){max=pointarr[i]-0};
                    if(min>pointarr[i]-0){min=pointarr[i]-0};
                  }
                }
              }
            }
            var valueheight = max-min;
            for(var i=0;i<pointarr.length;i++){
              if(pointarr[i]>0){
                newpointarr.push(((pointarr[i]-min)/valueheight*svg_slope)+(100-svg_slope)/2);
                if(pointarr[i]==min){
                  newpointarr[i]=(100-svg_slope)/2+1;
                }
              }else{
                newpointarr.push(0);
              }
            }
            var coordinateXlength = newpointarr.length;
            var windowWidth = window.innerWidth;
            var firstno0 = 0;
            var lastno0;
            var result={};
            result.points=[];
            result.acreages=[];
            for(var i=0;i<newpointarr.length;i++){
              if(newpointarr[i]>0){
                result.path= "M"+(windowWidth/coordinateXlength/2+windowWidth/coordinateXlength*i)+","+(-newpointarr[i]+160);
                result.acreages= "M"+(windowWidth/coordinateXlength/2+windowWidth/coordinateXlength*i)+","+(-newpointarr[i]+160);

                result.points.push((windowWidth/coordinateXlength/2+windowWidth/coordinateXlength*i)+","+(-newpointarr[i]+160));
                firstno0=i;

                break;

              }

            }
            for(var i=firstno0+1;i<newpointarr.length;i++){
              if(newpointarr[i]>0){
                result.path +=" L"+(windowWidth/coordinateXlength/2+windowWidth/coordinateXlength*i)+","+(-newpointarr[i]+160);
                result.path +=" L"+(windowWidth/coordinateXlength/2+windowWidth/coordinateXlength*i)+","+(-newpointarr[i]+160.001);//弥补只有两个点的时候不显示线段的问题

                result.acreages +=" L"+(windowWidth/coordinateXlength/2+windowWidth/coordinateXlength*i)+","+(-newpointarr[i]+160);
                lastno0=i;
                result.points.push((windowWidth/coordinateXlength/2+windowWidth/coordinateXlength*i)+","+(-newpointarr[i]+160));
              }
            }
            result.acreages+=" L"+(windowWidth/coordinateXlength/2+windowWidth/coordinateXlength*lastno0)+",185";
            result.acreages+=" L"+(windowWidth/coordinateXlength/2+windowWidth/coordinateXlength*firstno0)+",185";
            result.acreages+=" L"+(windowWidth/coordinateXlength/2+windowWidth/coordinateXlength*firstno0)+","+(-newpointarr[firstno0]+160);

            return result;
          }
        },
        selectcommom:function(id){ //将某id的class添加点击事件 ，添加class.selected和删除class.selected
          var self = this;
          var selectedbox = document.getElementById(id);
          var parentbox = selectedbox.parentNode;
          removeClass(parentbox.getElementsByClassName("selected")[0],"selected");
          addClass(selectedbox,"selected");



          function addClass( elements,cName ){
            elements.className += " " + cName;
          };
          function removeClass( elements,cName ){
            elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换
          };
        }



      }
    },

    ready:function(){
      var self = this;



      datetools.updatecoordinateXs.month(self);//更新横坐标
      datetools.updateSedDate.month(self);//更新可以左右选择的日期的内容
      updataPointNum(self,api);//获取数据，更新self.pointnum //debug

    },

    route:{
      data:function(){
        document.title="曲线分析";
        var self = this;










      }
    },


    methods:{
      selectedweek:function(id){
        var self = this;


        //self.pointnum = ["123",134,255,200,134,127,244];


        datetools.updateSedDate.week(self);//更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
        datetools.updatecoordinateXs.week(self);//更新横坐标函数 第二个参数可以输入某一个日期例如"2015-12-10"  会自动更新横坐标 在这个日期往前推七天

        self.selectcommom(id);
        updataPointNum(self,api);//获取数据，更新self.pointnum //debug
        //self.updataSVG(self);//这个函数需要放在数据重置后执行，作用是更新svg曲线
      },
      selectedmonth:function(id){
        var self = this;



        //self.pointnum = [255,282,134,127,244,300];

        datetools.updateSedDate.month(self);//更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
        datetools.updatecoordinateXs.month(self);//更新横坐标函数 第二个参数可以输入某一个日期例如"2015-12-10"  会自动更新横坐标 在这个日期往前推一个月

        self.selectcommom(id);
        updataPointNum(self,api);//获取数据，更新self.pointnum //debug
        //self.updataSVG(self);//这个函数需要放在数据重置后执行，作用是更新svg曲线
      },
      selectedyear:function(id){
        var self = this;


        datetools.updateSedDate.year(self);//更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
        datetools.updatecoordinateXs.year(self) //更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如"10"  会自动更新横坐标 在这个日期往前推12个月

        //self.pointnum = ["123",2,2,2,2,0,2,244,200,134,127,244];

        self.selectcommom(id);
        updataPointNum(self,api);//获取数据，更新self.pointnum //debug
        //self.updataSVG(self);//这个函数需要放在数据重置后执行，作用是更新svg曲线
      },
      selectedweight:function(id){
        var self = this;
        self.unit = "kg";



        updataPointNum(self,api);//获取数据，更新self.pointnum //debug
        self.selectcommom(id);//必须在self.pointnum重置后执行
      },
      selectedbmi:function(id){
        var self = this;
        self.unit = " ";


        updataPointNum(self,api);//获取数据，更新self.pointnum //debug
        self.selectcommom(id);//必须在self.pointnum重置后执行
      },
      selectedfat:function(id){
        var self = this;
        self.unit = "%";

        updataPointNum(self,api);//获取数据，更新self.pointnum //debug
        self.selectcommom(id);
      },
      valueshow:function(num){
        var self = this;
        var trigger_text = document.getElementsByClassName("trigger_value_number");
        var trigger_box = document.getElementsByClassName("trigger_box");
        var value_box = document.getElementsByClassName("value_box");

        self.showvalues=[];
        for(var i=0;i<self.pointnum.length;i++){
          if(self.pointnum[i]>0){
            self.showvalues.push(self.pointnum[i])
          }
        }

        for(var i=0;i<self.showvalues.length;i++){
          trigger_text[i].innerHTML=self.showvalues[i];

        }

        for(var i=0;i<trigger_box.length;i++){
          trigger_box[i].style.opacity=0;
          value_box[i].style.display="none";
        }
        trigger_box[num].style.opacity=1;
        value_box[num].style.display="block";

      },
      prevdate:function(){
        var self = this;
        var pointer_left = document.getElementsByClassName("pointer_left")[0];
        var pointer_right = document.getElementsByClassName("pointer_right")[0];
        var selectdatetype = document.getElementsByClassName("selected")[0];
        var sed_datetext = document.getElementsByClassName("sed_datetext")[0];
        var firstdate = sed_datetext.getAttribute("data-firstdate");
        var lastdate = sed_datetext.getAttribute("data-lastdate");
        var newlastdate = new Date(new Date(firstdate)-1000*60*60*24);
        document.getElementsByClassName("pointer_right")[0].style.opacity="1"
        if(selectdatetype.id == "yearbox"){

          datetools.updateSedDate.year(self,newlastdate);//更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
          datetools.updatecoordinateXs.year(self,newlastdate) //更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如"10"  会自动更新横坐标 在这个日期往前推12个月
        }else if(selectdatetype.id == "monthbox"){

          datetools.updateSedDate.month(self,newlastdate);//更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
          datetools.updatecoordinateXs.month(self,newlastdate) //更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如"10"  会自动更新横坐标 在这个日期往前推12个月
        }else if(selectdatetype.id == "weekbox"){


          datetools.updateSedDate.week(self,newlastdate);//更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
          datetools.updatecoordinateXs.week(self,newlastdate) //更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如"10"  会自动更新横坐标 在这个日期往前推12个月
        }

        updataPointNum(self,api);//获取数据，更新self.pointnum //debug

      },
      nextdate:function(){
        var self = this;
        var pointer_left = document.getElementsByClassName("pointer_left")[0];
        var pointer_right = document.getElementsByClassName("pointer_right")[0];
        var selectdatetype = document.getElementsByClassName("selected")[0];
        var sed_datetext = document.getElementsByClassName("sed_datetext")[0];
        var firstdate = sed_datetext.getAttribute("data-firstdate");
        var lastdate = sed_datetext.getAttribute("data-lastdate");


        if(selectdatetype.id == "yearbox"){

          var newlastdate = new Date((new Date(lastdate)-0)+1000*60*60*24*366);

          if(newlastdate-new Date()>0){
            console.log("超过当前日期");
            document.getElementsByClassName("pointer_right")[0].style.opacity="0"
          }else{
            datetools.updateSedDate.year(self,newlastdate);//更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
            datetools.updatecoordinateXs.year(self,newlastdate) //更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如"10"  会自动更新横坐标 在这个日期往前推12个月
            updataPointNum(self,api);//获取数据，更新self.pointnum //debug
          }

        }else if(selectdatetype.id == "monthbox"){
          var newlastdate = new Date((new Date(lastdate)-0)+1000*60*60*24*30);
          if(newlastdate-new Date()>0){
            console.log("超过当前日期");
            document.getElementsByClassName("pointer_right")[0].style.opacity="0"
          }else{
            datetools.updateSedDate.month(self,newlastdate);//更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
            datetools.updatecoordinateXs.month(self,newlastdate) //更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如"10"  会自动更新横坐标 在这个日期往前推12个月
            updataPointNum(self,api);//获取数据，更新self.pointnum //debug
          }

        }else if(selectdatetype.id == "weekbox"){

          var newlastdate = new Date((new Date(lastdate)-0)+1000*60*60*24*7);
          if(newlastdate-new Date()>0){
            console.log("超过当前日期");
            document.getElementsByClassName("pointer_right")[0].style.opacity="0"
          }else{
            datetools.updateSedDate.week(self,newlastdate);//更新可以左右选择的日期的内容 第二个参数可以输入某一个日期例如"2015-12-10"
            datetools.updatecoordinateXs.week(self,newlastdate) //更新横坐标函数 第二个参数可以输入某一个月份作为显示的最后一个月例如"10"  会自动更新横坐标 在这个日期往前推12个月


            updataPointNum(self,api);//获取数据，更新self.pointnum //debug
          }

        }


      }

    }




  }

</script>