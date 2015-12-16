module.exports = function (Vue, Promise, config) {
  return {



    getOpenId: function(code) {//获取可以用code换得的数据
      return new Promise(function(resolve, reject) {
        Vue.http.post(
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale_user/getCode/'+code,
          JSON.stringify(params),
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
    getUrlStr:function(name){
      var result = null;
      if(window.location.href.split(name+"=")[1]){
        var result = testhref.split(name+"=")[1].split("&")[0];
      }
       return result;
    }
  }
}