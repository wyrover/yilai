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
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale/getUserDevices/'+deviceid,
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
    DeviceUnbindUser:function(deviceid,openid){
      wx.config({
        debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId : "", // 必填，公众号的唯一标识
        timestamp : new Date().getTime(), // 必填，生成签名的时间戳
        nonceStr : generateMixed(10), // 必填，生成签名的随机串
        signature : "signature",// 必填，签名，见附录1
        jsApiList : [ 'scanQRCode', 'configWXDeviceWiFi', 'openWXDeviceLib',
            'closeWXDeviceLib', 'getWXDeviceInfos', 'getWXDeviceTicket',
            'onWXDeviceBindStateChange', 'onWXDeviceStateChange',
            'onReceiveDataFromWXDevice', 'onWXDeviceBluetoothStateChange' ]
      });
      wx.ready(function() {
        // 打开sdk
        WeixinJSBridge.invoke('openWXDeviceLib', {}, function(res) {
          //write('openWXDeviceLib : ' + JSON.stringify(res));
          // 打开了再去获取设备列表
          params={//获取操作凭证
            deviceId:"deviceid",//设备id
            type:2//获取的操作凭证类型，1:绑定设备 2:解绑设备
          }
          WeixinJSBridge.invoke('getWXDeviceTicket', params, function(res) {
            var ticket = res.ticket
            return new Promise(function(resolve, reject) {
              Vue.http.get(
                config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale/unbind/'+deviceid+"/"+openid+"/"+ticket,
                function(data, status, request) {
                  resolve(status);
                }, {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }
              ).error(function(data, status, request) {
                reject(data.error);
              });
            });
          });
        });
      });
    }
  }
}

/****************************************************



    /5dba318782f34938920da2ee0eeb1440/scale/getUserDevices/openid //获取用户绑定设备列表
/5dba318782f34938920da2ee0eeb1440/scale/getUserDevices/deviceid  //获取该设备绑定用户
/5dba318782f34938920da2ee0eeb1440/scale/unbind/deviceid/openid/ticket //删除设备与用户绑定的关系


******************************************************/


/***************调用微信接口 start****************/
function generateMixed(n) { //生成随机字符串
  var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var res = "";
  for(var i = 0; i < n ; i ++) {
    var id = Math.ceil(Math.random()*35);
    res += chars[id];
  }
  return res;
}
/***************调用微信接口 end****************/