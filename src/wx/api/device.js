
var timestamp = new Date().getTime();
var generateMixed = function (n) { //生成随机字符串
  var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var res = "";
  for(var i = 0; i < n ; i ++) {
    var id = Math.ceil(Math.random()*35);
    res += chars[id];
  }
  return res;
}
var noncestr = generateMixed(10);
/*var wxconfig = function(signature){
    wx.config({
      debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId : "wx9019f1e5ae967063", // 必填，公众号的唯一标识
      timestamp : timestamp, // 必填，生成签名的时间戳
      nonceStr : noncestr, // 必填，生成签名的随机串
      signature : signature,// 必填，签名，见附录1
      jsApiList : [ 'scanQRCode', 'configWXDeviceWiFi', 'openWXDeviceLib',
          'closeWXDeviceLib', 'getWXDeviceInfos', 'getWXDeviceTicket',
          'onWXDeviceBindStateChange', 'onWXDeviceStateChange',
          'onReceiveDataFromWXDevice', 'onWXDeviceBluetoothStateChange' ]
    });
    wx.ready(function() {
        // 打开sdk
      console.log("wx.ready")
      WeixinJSBridge.invoke('openWXDeviceLib', {}, function(res) {
        console.log('openWXDeviceLib : ' + JSON.stringify(res));
        WeixinJSBridge.invoke('getWXDeviceTicket', params, function(res) {
          var ticket = res.ticket
          alert("ticket:"+ticket)

        });
      });
    });
    wx.error(function(res){
      console.log('wx.error : ' + JSON.stringify(res));
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
  }*/


module.exports = function (Vue, Promise, config) {
  return {

    /*1.获取用户绑定设备列表
        1. url:get
    */
    getDevicesList: function(openid) {
      return new Promise(function(resolve, reject) {
        Vue.http.get(
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale/getUserDevices/'+openid,
          function(data, status, request) {
            resolve(data);
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        ).error(function(data, status, request) {
          reject(data.error);
        });
      });
    },


    /*2.获取该设备绑定用户
        1. url:get
    */
    getDevicesUsers: function(deviceid) {
      return new Promise(function(resolve, reject) {
        Vue.http.get(
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale/getDevicesUsers/'+deviceid,
          function(data, status, request) {
            resolve(data);
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        ).error(function(data, status, request) {
          reject(data.error);
        });
      });
    },



    /*3.删除设备与用户绑定的关系
        1. url:get
    */
    DeviceUnbindUser:function(deviceid,openid,signature){
      alert("signature:"+signature)
      wx.config({
        debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId : "wx9019f1e5ae967063", // 必填，公众号的唯一标识
        timestamp : timestamp, // 必填，生成签名的时间戳
        nonceStr : noncestr, // 必填，生成签名的随机串
        signature : signature,// 必填，签名，见附录1
        jsApiList : [ 'scanQRCode', 'configWXDeviceWiFi', 'openWXDeviceLib',
            'closeWXDeviceLib', 'getWXDeviceInfos', 'getWXDeviceTicket',
            'onWXDeviceBindStateChange', 'onWXDeviceStateChange',
            'onReceiveDataFromWXDevice', 'onWXDeviceBluetoothStateChange' ]
      });
      wx.ready(function() {
          // 打开sdk
        console.log("wx.ready!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        alert("wx.ready!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        //console.log(WeixinJSBridge.invoke)






        WeixinJSBridge.invoke('openWXDeviceLib', {}, function(res) {
          console.log('openWXDeviceLib : ' + JSON.stringify(res));
          alert('openWXDeviceLib : ' + JSON.stringify(res));
          var params={
            deviceId:deviceid,
            type:2
          }
          WeixinJSBridge.invoke('getWXDeviceTicket', params, function(res) {
            var ticket = res.ticket
            alert("ticket:"+ticket)

          });
        });




      });
      wx.error(function(res){
        console.log('wx.error : ' + JSON.stringify(res));
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    },


    /*4.获取Signature*/

    getSignature:function(){
      console.log("获取Signature....")
      alert("noncestr: "+noncestr)
      alert("timestamp: "+timestamp)
      alert("signUrl: "+window.location.href)
      return new Promise(function(resolve, reject) {
        Vue.http.get(
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale_user/getSignature?noncestr='+noncestr+'&timestamp='+timestamp+'&signUrl='+window.location.href,
          function(data, status, request) {
            resolve(data);
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        ).error(function(data, status, request) {
          reject(data.error);
        });
      });
    }

  }
}



/****************************************************



    /5dba318782f34938920da2ee0eeb1440/scale/getUserDevices/openid //获取用户绑定设备列表
    /5dba318782f34938920da2ee0eeb1440/scale/getUserDevices/deviceid  //获取该设备绑定用户
/5dba318782f34938920da2ee0eeb1440/scale/unbind/deviceid/openid/ticket //删除设备与用户绑定的关系


  /5dba318782f34938920da2ee0eeb1440/scale/getDevicesUsers/deviceid//获取该设备绑定用户

  /5dba318782f34938920da2ee0eeb1440/scale/getDevicesUsers/deviceid//获取该设备绑定用户

getDevicesUsers
******************************************************/


/***************调用微信接口 start****************/



/***************调用微信接口 end****************/