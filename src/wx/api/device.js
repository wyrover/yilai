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
    DeviceUnbindUser: function(deviceid,openid,ticket) {
      return new Promise(function(resolve, reject) {
        Vue.http.get(
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale/unbind/'+deviceid+"/"+openid+"/"+ticket,
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


******************************************************/