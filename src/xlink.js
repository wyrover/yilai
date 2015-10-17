var Promise = require('lie');

var Xlink = {
  // deviceId: '100008671', // 开发板
  deviceId: '100015787', // 测试设备

  appId: '1234567',

  // test.xlink.cn
  tokenId: __DEV__ ? '07ec2954435c4b14afd9199590476b4f' : '6cc6e51fecda45dea7486f6a184ffddf',

  domain: __DEV__ ? 'http://test.xlink.cn/' : 'http://wx-sta.xlink.cn/',

  apiRoot: 'http://wx3.xlink.cn/',

  nonceStr: 'Wm3WZYTPz0wzccnW',

  /**
   * 获取 OpenId
   * @return {Promise}
   */
  fetchOpenId: function () {
    var _that = this;
    var apiUrl = this.apiRoot + 'wxgateway/urlOpenid?openidCallback=?';
    var code = this.getQueryString('code');
    var params = {
      'tokenId': this.tokenId,
      'code': code
    };

    if (__DEV__) {
      writeLog('发送请求获取用户 OpenId，附带参数：' + JSON.stringify(params));
    }

    return new Promise(function (resolve, reject) {
      // 开发环境跳过流程
      if (__DEV__) {
        writeLog('检测到当前处于开发环境，跳过获取 OpenId 的流程');
        return resolve('');
      }

      $.ajax({
        type: 'GET',
        url: apiUrl,
        data: params,
        async: false,
        dataType: 'jsonp',
        success: function (data) {
          if (data.status === 200) {
            if (__DEV__) {
              writeLog('成功获取用户的 OpenId：' + data.openid);
            }
            resolve(data.openid);
          } else {
            if (__DEV__) {
              writeLog('获取用户 OpenId 失败：' + JSON.stringify(data));
            }
            reject('获取用户 OpenId 失败');
          }
        },
        error: function (data) {
          if (__DEV__) {
            writeLog('获取用户 OpenId 失败：' + JSON.stringify(data));
          }
          reject('获取用户 OpenId 失败');
        }
      });

    });
  },

  /**
   * 获取设备列表
   * @param  {String} openId 用户 openid
   * @return {Promise}
   */
  fetchDeviceList: function () {
    var _that = this;

    return this.fetchOpenId().then(function (openId) {
      var apiUrl = _that.apiRoot + 'wxgateway/wxDevicelist?devicelistCallback=?';
      var params = {
        openId: openId,
        tokenId: _that.tokenId
      };

      if (__DEV__) {
        writeLog('发送请求获取设备列表，附带参数：' + JSON.stringify(params));
      }

      return new Promise(function (resolve, reject) {
        // 开发环境跳过流程
        if (__DEV__) {
          writeLog('检测到当前处于开发环境，跳过获取设备列表的流程，直接使用设定的 deviceId：' + _that.deviceId);
          return resolve([]);
        }

        $.ajax({
          type: 'GET',
          url: apiUrl,
          data: params,
          async: false,
          dataType: 'jsonp',
          success: function (data) {
            if (data.status === 200) {
              // 多设备情况
              if (data.devices.length === 1) {
                _that.deviceId = data.devices[0].deviceID;
                // alert(_that.deviceId);
                resolve(data.devices);
              } else if (data.devices.length > 1) {
                _that.deviceId = data.devices[0].deviceID;
                resolve(data.devices);
              }else {
                if (__DEV__) {
                  writeLog('获取设备列表失败：' + JSON.stringify(data));
                }
                reject('未能检测到设备');
              }
            } else {
              if (__DEV__) {
                writeLog('获取设备列表失败：' + JSON.stringify(data));
              }
              reject('未能检测到设备');
            }
          },
          error: function (error) {
            if (__DEV__) {
              writeLog('获取设备列表失败：' + JSON.stringify(data));
            }
            reject('未能检测到设备');
          }
        });

      });
    });
  },

  loadXJSSDK: function () {
    var _that = this;

    return this.fetchDeviceList().then(function (devices) {
      return new Promise(function (resolve, reject) {
        XJSObject.setConfig({
          _debug: __DEV__
        });

        if (__DEV__) {
          writeLog('JSSDK加载中...');
        }

        // 加载JSSDK
        XJSObject.invoke('loadXJSAPILib', {
          type: 'remote',
          // host : 'http://127.0.0.1:23777', // 测试的服务器地址
          host: 'http://cm.xlink.cn:23777',
          appid: _that.appId
        }, function(r) {
          //  判断资源是否加载成功
          if (r.status === 200) {
            if (__DEV__) {
              writeLog('JSSDK加载成功' + JSON.stringify(r));
            }
            resolve(r);
          } else {
            reject('JSSDK加载失败' + JSON.stringify(r));
          }
        });
      });
    });

  },

  /**
   * 初始化
   * @return {Promise}
   */
  init: function () {
    var _that = this;

    return this.loadXJSSDK().then(function () {
      return _that.connectDevice();
    });
  },

  /**
   * 连接设备
   * @return {Promise}
   */
  connectDevice: function () {
    var _that = this;

    return new Promise(function (resolve, reject) {
      XJSObject.invoke('connectXDevice', {
        deviceid: _that.deviceId,
        appid: _that.appId,
        token: _that.tokenId
      }, function (r) {
        if (r.status === 200) {
          if (__DEV__) {
            writeLog('设备连接成功：' + JSON.stringify(r));
          }
          resolve(r);
        } else{
          if (__DEV__) {
            writeLog('设备连接失败：' + JSON.stringify(r));
          }
          reject('设备连接失败，请检查设备是否已开启');
        }
      });
    });
  },

  send: function (command) {
    var _that = this;
    var st = '';

    if (__DEV__) {
      writeLog('向设备发送' + command.label + '指令：' + command.body);
    }

    return new Promise(function (resolve, reject) {
      XJSObject.invoke('sendXDeviceData', {
        deviceid: _that.deviceId,
        appid: _that.appId,
        token: _that.tokenId,
        data: command.body
      }, function(r) {
        if (r.status === 200) {
          if (__DEV__) {
            writeLog('--------------------------------------');
            writeLog(command.label + '指令发送成功：' + JSON.stringify(r));
          }
          resolve(r);
        } else{
          if (__DEV__) {
            writeLog('--------------------------------------');
            writeLog(command.label + '指令发送失败：' + JSON.stringify(r));
          }
          reject('指令发送失败');
        }
      });
    });
  },

  hex2Int: function (hex) {
    return parseInt('0X' + hex, 16);
  },

  encode: function (data) {
    var str = String.fromCharCode.apply(null,data); //js字符串转换二进制列表
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
  },

  decode: function (b64) {
    var bytes = decodeBase64(b64);
    var msg;
    var output = '';

    var outputArr = bytes.map(function (item) {
      var hex = item.toString(16);
      if (item < 10) {
        hex = '0' + item;
      }
      return hex;
    });
    output = outputArr.join(' ');

    if (__DEV__) {
      writeLog('转为十六进制指令：' + output);
    }

    msg = outputArr.slice(4, -2);

    return new Promise(function (resolve, reject) {
      resolve(msg);
    });
  },

  genCommand: function (msg) {
    var bytes = [];
    var verifyCode;
    var command = {};

    // 帧头
    bytes[0] = this.hex2Int('7e');

    // 源地址
    bytes[1] = 1;

    // 目的地址
    bytes[2] = this.hex2Int('10');

    // 消息体长度
    bytes[3] = msg.size;

    // 如果是应答指令，还需要将源地址与目的地址互换
    if (bytes[2] === 2) {
      bytes[1] = bytes[1] ^ bytes[2];
      bytes[2] = bytes[2] ^ bytes[1];
      bytes[1] = bytes[1] ^ bytes[2];
    }

    for (var i = 0, len = msg.body.length; i < len; i++) {
      bytes.push(this.hex2Int(msg.body[i]));
    }

    // 校验码
    verifyCode = bytes.reduce(function (previousValue, currentValue) {
      return previousValue ^ currentValue;
    });
    bytes.push(verifyCode);

    // 帧尾
    bytes.push(this.hex2Int('7f'));

    // 加一位在最前面让机器更快响应
    bytes.unshift(this.hex2Int('aa'));

    if (__DEV__) {
      var output = '';
      var outputArr = bytes.map(function (item) {
        var hex = item.toString(16);
        if (item < 10) {
          hex = '0' + item;
        }
        return hex;
      });
      output = outputArr.join(' ');

      if (__DEV__) {
        writeLog('--------------------------------------');
        writeLog('生成十六进制指令：' + output);
      }
    }

    command.body = this.encode(bytes);
    command.label = msg.label;

    return command;
  },

  /**
   * 获取 URL 指定参数值
   * @param  {String} name 指定的参数名称
   * @return {String} 对应的参数值
   */
  getQueryString: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

};

module.exports = Xlink;