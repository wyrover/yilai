module.exports = function (Vue, Promise, config) {
  return {

    /*0.获取用户信息
        1. url:get  /v1/scale_user/info

    */
    getUserInformation: function(openid) {
      return new Promise(function(resolve, reject) {
        Vue.http.get(
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale_user/info/'+openid,
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

    /*1.设置用户信息
        1. url:post  /v1/scale_user/info
        2. 发送：
          {
            "brith":"1980-02-04",
            "height":180,
            "target_weight":78000
          }
        3.接收：
          {
            "status":200
          }
    */
    setUserInformation: function(params,openid) {
      return new Promise(function(resolve, reject) {
        Vue.http.post(
          //config.apiRoot + '/scale_user/info'+openid,
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale_user/info/'+openid,
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
    },

    /*2.获取单条数据
        1. url:get  /v1/scale/statistic/1234567890
        2. 发送：
          无
        3.接收：
          {
            "date":"2015-11-11 12:00:00",
            "age":30,
            "height":178,
            "weight":80212,
            "bmi":35,
            "fat":10,
            "moisture":11,
            "muscle":12,
            "bone":13,
            "metabolism":14
          }
    */
    getOneData: function(state) {
      return new Promise(function(resolve, reject) {
        Vue.http.get(
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale_user/statistic/'+state,
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

    /*3.批量获取数据
        1. url:post  /v1/scale/statistic/list
        2. 发送：
          {
            "offset":0,
            "count":30
          }
        3.接收：
          {
            "count":2,
            "statistic":[
              {
                "date":"2015-11-11 12:00:00",
                "age":30,
                "height":178,
                "weight":80212,
                "bmi":35,
                "fat":10,
                "moisture":11,
                "muscle":12,
                "bone":13,
                "metabolism":14
              },
              {
                "date":"2015-11-05 12:00:00",
                "age":30,
                "height":178,
                "weight":80212,
                "bmi":35,
                "fat":10,
                "moisture":11,
                "muscle":12,
                "bone":13,
                "metabolism":14
              }
            ]
          }
    */
    getMultiData: function(params,openid) {
      return new Promise(function(resolve, reject) {
        Vue.http.post(
          //config.apiRoot + '/scale/statistics/list',
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale_user/statisticList/'+openid,
          JSON.stringify(params),
          function(data, status, request) {
            resolve(data,status);
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

    /*4.获取单日数据
        1. url:post  /v1/scale/statistic/daily
        2. 发送：
          {
            "end_date":"2015-11-11",
            "day":7,
            "avg":true
          }
        3.接收：
          {
            "count":2,
            "statistic":[
              {
                "date":"2015-11-11 12:00:00",
                "age":30,
                "height":178,
                "weight":80212,
                "bmi":35,
                "fat":10,
                "moisture":11,
                "muscle":12,
                "bone":13,
                "metabolism":14
              },
              {
                "date":"2015-11-05 12:00:00",
                "age":30,
                "height":178,
                "weight":80212,
                "bmi":35,
                "fat":10,
                "moisture":11,
                "muscle":12,
                "bone":13,
                "metabolism":14
              }
            ]
          }
    */
    getDayData: function(params,openid) {
      return new Promise(function(resolve, reject) {
        Vue.http.post(
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/wx/daily/'+openid,
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

    /*5.获取月数据

    */
    getMonthData: function(params,openid) {
      return new Promise(function(resolve, reject) {
        Vue.http.post(
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/wx/monthly/'+openid,
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

    /*6.获取年数据

    */
    getYearData: function(params,openid) {
      return new Promise(function(resolve, reject) {
        Vue.http.post(
          config.apiRoot + '/5dba318782f34938920da2ee0eeb1440/scale/yearly/'+openid,
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
    }


/****************************************************



    /5dba318782f34938920da2ee0eeb1440/scale/getUserDevices/openid //获取用户绑定设备列表
/5dba318782f34938920da2ee0eeb1440/scale/getUserDevices/deviceid//获取该设备绑定用户
/5dba318782f34938920da2ee0eeb1440/scale/unbind/deviceid/openid/ticket //删除设备与用户绑定的关系


******************************************************/
  }
}