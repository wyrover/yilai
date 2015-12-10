<template lang="jade">
  .main-content.chart_page
    .date_switch
      .fir_datetype
        .datetype_box.week#weekbox(v-on:click.prevent.stop="selectedtype('weekbox')") 周
        .datetype_box.month#monthbox.selected(v-on:click.prevent.stop="selectedtype('monthbox')") 月
        .datetype_box.year#yearbox(v-on:click.prevent.stop="selectedtype('yearbox')") 年
      .sed_datetype
        i.pointer_left &lt;
        |10月15日~18日
        i.pointer_right &gt;
      .chart_box
        //y坐标轴
        //.coordinateY
          li.coordinateYli(v-for="coordinateYtext in coordinateYtexts | orderBy 'coordinateYtext' -1")
            span.coordinateYtext {{coordinateYtext}}
            i.line

        .chart_canvas
          //svg.svg#svg(v-bind:width="'100%'",v-bind:height="'180px'",v-bind:viewBox="'0 0 375 180'")
          svg.svg#svg(v-bind:width="'100%'",v-bind:height="'180px'")
            defs
              linearGradient#linearGradient-1(v-bind:x1="'0%'",v-bind:y1="'100%'",v-bind:x2="'100%'",v-bind:y2="'100%'")
                stop(v-bind:stop-color="'#2090F8'",v-bind:offset="'0%'")
                stop(v-bind:stop-color="'#01FCE4'",v-bind:offset="'40%'")
                stop(v-bind:stop-color="'#0BFF8C'",v-bind:offset="'78%'")
                stop(v-bind:stop-color="'#51FF00'",v-bind:offset="'100%'")
            g#Page-1(stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage")
              path#points_path.path(v-bind:d="d",v-bind:stroke="'url(#linearGradient-1)'",v-bind:stroke-width="4",v-bind:sketch:type="'MSShapeGroup'")
        .coordinateX
          span.coordinateX_date 15~21
          span.coordinateX_date 15~21
          span.coordinateX_date 15~21
          span.coordinateX_date 15~21
          span.coordinateX_date 15~21
    .type_switch
      ul.type_switch_ul
        li.date_type.weight.selected#weightbutton(v-on:click.prevent.stop="selectedtype('weightbutton')")
          .divbotton.weighticon
            span 体重
        li.date_type.bmi#bmibutton(v-on:click.prevent.stop="selectedtype('bmibutton')")
          .divbotton.bmiicon
            span BMI
        li.date_type.fat#fatbutton(v-on:click.prevent.stop="selectedtype('fatbutton')")
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
      .chart_box
        width 100%
        height 252px
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
          height 220px
          position relative
          .svg
            //background rgba(255,0,0,0.3)
            margin-top 20px
            .path
              stroke-dasharray 1000
              stroke-dashoffset 1000;
              animation dash 2s ease-in forwards
              animation-iteration-count 1
              animation-delay 0s
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
</style>
<script>

  module.exports = {

    data: function () {
      return {
        d:"",
        point:["0","90","60","50","20"],
        coordinateYtexts:["1kg","7kg","3kg","4kg","5kg"],
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
        }


      }
    },

    ready:function(){
      var self = this;
      self.d=pointToD(self.point)



      function pointToD(pointarr){
        var coordinateXlength = 5
        var windowWidth = window.innerWidth;
        var result= "M"+windowWidth/coordinateXlength/2+","+(-pointarr[0]+180);
        for(var i=1;i<pointarr.length;i++){
          result +=" L"+(windowWidth/coordinateXlength/2+windowWidth/coordinateXlength*i)+","+(-pointarr[i]+180)
        }
        return result;
      }
    },

    route:{
      data:function(){
      }
    },

    methods:{
      selectedtype:function(id){
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




  }

</script>