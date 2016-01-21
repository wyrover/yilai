<template lang="jade">
  .main-content
    ul.equipment_list
      li(v-for="device in devices")
        .entrance
          //- a(v-link="{path: '/setting/equipment/'+device.id+'?deviceType='+device.type}")
          a(v-on:click="linkTo(device.id,device.type)")
            .equipment_img
              img(v-bind:src="device.src",v-bind:width="'100%'",v-bind:height="'100%'")
            span.equipment_name {{device.name}}
            i.more
    .loadingdiv(v-if="loadData" v-bind:data-pageshow = "pageshow")
      loading
      //-li
        .entrance
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
  var Loading = require('../../../../shared/components/loading.vue');
  var api = require('../../../api');

  module.exports = {
    components: {
      'loading': Loading,
      'api': api
    },
    data: function () {
      return {
        pageshow:false,
        getDevice_list:[
          {
            device_type:"gh_72b6b07b48cb",
            device_id:"gh_72b6b07b48cb_6dcbc7892ccdca7f697b70aec42bde0d"
          }
        ]

      };
    },
    computed:{
      loadData:function(){
        return !this.pageshow
      },
      devices:function(){
        var self = this;
        var getDevice_list = this.getDevice_list;
        var deviceslist = [];
        for(var i=0;i<getDevice_list.length;i++){
          deviceslist.push({
            name:"亿莱脂肪秤",
            id:getDevice_list[i].device_id,
            type:getDevice_list[i].device_type,
            src:'http://test.xlink.cn/yilai/wx/images/'+getDevice_list[i].device_type+'.png'
          })
        }
        return deviceslist;
      }
    },
    route:{

      data:function(){
        document.title = "设备管理";
        var self = this;

        var openid = localStorage.openid;
        if(__DEBUG__){
          openid = "ozEANuMKQsrGLWXJ4D82louIQeWs"
        }
        setTimeout(function(){
          self.pageshow=true;
        },10000)
        api.device.getDevicesList(openid).then(function(data){
          if(__DEBUG__){
            console.log(data);
          }
          console.log(data.resp_msg.ret_code)
          if(data.resp_msg.ret_code == 0&&data.device_list){
            self.getDevice_list = data.device_list;
          }
          self.pageshow=true;
        })
      }
    },
    methods: {
      linkTo:function(id,type){
        console.log("id:"+id)
        console.log("type:"+type)
        window.location.href = window.location.origin+"/"+"deviceDetails.html?deviceType="+type+"&deviceId="+id+"&linkTo=details";
      },
    }
  };
</script>
