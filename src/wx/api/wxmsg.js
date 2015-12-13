module.exports = function (Vue, Promise, config) {
  return {



    test: function(params) {//测试用  发送验证码
      return new Promise(function(resolve, reject) {
        Vue.http.post(
          config.apiRoot + '/sms/verifycode',
          JSON.stringify(params),
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
    }
  }
}