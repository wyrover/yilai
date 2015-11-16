var Promise = require('lie');
var config = require('../config');
var COMMANDS = require('../consts/commands');

var Util = {
  deviceId: '', // 设备 deviceId

  appId: '1234567', // XJSObject 用到

  openId: '',

  apiRoot: 'http://wx3.xlink.cn/',

  loaded: false,

  /**
   * 获取 OpenId
   * @return {Promise}
   */
  fetchOpenId: function () {
    var _that = this;
    var apiUrl = this.apiRoot + 'wxgateway/urlOpenid?openidCallback=?';
    var code = this.getQueryString('code');
    var params = {
      'tokenId': config.tokenId,
      'code': code
    };

    if (__DEBUG__) {
      console.log('发送请求获取用户 OpenId，参数：' + JSON.stringify(params));
    }

    return new Promise(function (resolve, reject) {
      // 开发环境跳过获取 OpenId 的流程，在生产环境会自动加入这一步流程
      if (__DEBUG__) {
        console.log('检测到当前处于开发环境，跳过获取 OpenId 的流程');
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
            if (__DEBUG__) {
              console.log('成功获取用户的 OpenId：' + data.openid);
            }
            _that.openId = data.openid;
            resolve(data.openid);
          } else {
            if (__DEBUG__) {
              console.log('获取用户 OpenId 失败：' + JSON.stringify(data));
            }
            reject('获取用户 OpenId 失败');
          }
        },
        error: function (data) {
          if (__DEBUG__) {
            console.log('获取用户 OpenId 失败：' + JSON.stringify(data));
          }
          reject('获取用户 OpenId 失败');
        }
      });

    });
  },

  /**
   * 获取设备列表
   * @return {Promise}
   */
  fetchDeviceList: function () {
    var _that = this;

    return this.fetchOpenId().then(function (openId) {
      var apiUrl = _that.apiRoot + 'wxgateway/wxDevicelist?devicelistCallback=?';
      var params = {
        openId: _that.openId,
        tokenId: config.tokenId
      };

      if (__DEBUG__) {
        console.log('发送请求获取设备列表，参数：' + JSON.stringify(params));
      }

      return new Promise(function (resolve, reject) {
        // 开发环境跳过流程
        if (__DEBUG__) {
          console.log('检测到当前处于开发环境，跳过获取设备列表的流程');
          if (config.deviceId) {
            console.log('检测到手动指定的 deviceId：' + config.deviceId);
            _that.deviceId = config.deviceId;
          } else {
            console.log('进入模拟开发模式');
          }
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
                if (__DEBUG__) {
                  console.log('获取设备列表失败：' + JSON.stringify(data));
                }
                reject(data);
              }
            } else {
              if (__DEBUG__) {
                console.log('获取设备列表失败：' + JSON.stringify(data));
              }
              reject(data);
            }
          },
          error: function (error) {
            if (__DEBUG__) {
              console.log('获取设备列表失败：' + JSON.stringify(data));
            }
            reject(data);
          }
        });

      });
    });
  },

  /**
   * 加载 JSSDK
   * @return {Promise}
   */
  loadXJSSDK: function () {
    var _that = this;

    return this.fetchDeviceList().then(function (devices) {
      return new Promise(function (resolve, reject) {
        XJSObject.setConfig({
          _debug: __DEBUG__
        });

        if (_that.loaded) {
          resolve('JSSDK已加载');
        }

        if (__DEBUG__) {
          console.log('JSSDK加载中...');
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
            if (__DEBUG__) {
              console.log('JSSDK加载成功' + JSON.stringify(r));
            }
            _that.loaded = true;
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
        token: config.tokenId
      }, function (r) {
        if (r.status === 200) {
          if (__DEBUG__) {
            console.log('设备连接成功：' + JSON.stringify(r));
          }
          resolve(r);
        } else{
          if (__DEBUG__) {
            console.log('设备连接失败：' + JSON.stringify(r));
          }
          reject(r);
        }
      });
    });
  },

  /**
   * 发送指令
   * @param {String} name 指令名称
   *
   * 本 Demo 指令生成规则：
   * 第一位为帧头，固定为 0x7E
   * 第二位为源地址，在下发指令，该值为 0x01；在上报指令中该值为 0x10
   * 第三位为目的地址，在下发指令，该值为 0x10；在上报指令中该值为 0x01
   * 第四位到倒数第三位为消息体，可变长度，由消息体长度、消息命令字和消息体参数组成
   * 倒数第二位为校验值，在本例中，该值为从帧开头（包含帧开头）到校验码前（不包含校验码）的所有字节的异或值
   * 最后一位为帧尾，固定为 0x7F
   *
   */
  sendCommand: function (name) {
    var msg = COMMANDS[name]; // 消息体
    var bytes = [];
    var verifyCode;
    var command = {};

    // 帧头
    bytes[0] = Util.hex2Int('7e');

    // 源地址
    bytes[1] = 1;

    // 目的地址
    bytes[2] = Util.hex2Int('10');

    // 如果是应答指令，还需要将源地址与目的地址互换
    if (bytes[2] === 2) {
      bytes[1] = bytes[1] ^ bytes[2];
      bytes[2] = bytes[2] ^ bytes[1];
      bytes[1] = bytes[1] ^ bytes[2];
    }

    // 消息体长度
    bytes[3] = msg.size;

    // 消息命令字
    bytes[4] = msg.cmd;

    // 消息体参数
    if (msg.params) {
      for (var i = 0, len = msg.params.length; i < len; i++) {
        bytes.push(Util.hex2Int(msg.params[i]));
      }
    }

    // 校验码
    verifyCode = bytes.reduce(function (previousValue, currentValue) {
      return previousValue ^ currentValue;
    });
    bytes.push(verifyCode);

    // 帧尾
    bytes.push(Util.hex2Int('7f'));

    if (__DEBUG__) {
      var output = '';
      var outputArr = bytes.map(function (item) {
        var hex = item.toString(16);
        if (item < 10) {
          hex = '0' + item;
        }
        return hex;
      });
      output = outputArr.join(' ');

      if (__DEBUG__) {
        console.log('--------------------------------------');
        console.log('生成十六进制指令：' + output);
      }
    }

    // 将指令转换成 BASE-64 编码
    command.body = Util.encode(bytes);
    command.label = msg.label;

    // 发送指令
    this.send(command);
  },

  /**
   * 下发指令
   * @param  {Object} command 指令
   * @return {Promise}
   */
  send: function (command) {
    var _that = this;
    var st = '';

    if (__DEBUG__) {
      console.log('向设备发送' + command.label + '指令：' + command.body);
    }

    return new Promise(function (resolve, reject) {
      XJSObject.invoke('sendXDeviceData', {
        deviceid: _that.deviceId,
        appid: _that.appId,
        token: config.tokenId,
        data: command.body
      }, function(r) {
        if (r.status === 200) {
          if (__DEBUG__) {
            console.log('--------------------------------------');
            console.log(command.label + '指令发送成功：' + JSON.stringify(r));
          }
          resolve(r);
        } else{
          if (__DEBUG__) {
            console.log('--------------------------------------');
            console.log(command.label + '指令发送失败：' + JSON.stringify(r));
          }
          reject('指令发送失败');
        }
      });
    });
  },

  /**
   * 十六进制转10进制
   * @param  {Number} hex 十六进制数
   * @return {Number} 十进制数
   */
  hex2Int: function (hex) {
    return parseInt('0x' + hex, 16);
  },

  /**
   * 编码
   * @param  {String} 目标字符串
   * @return {String} base-64编码
   */
  encode: function (data) {
    var str = String.fromCharCode.apply(null,data); // 先转换为二进制
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
  },

  /**
   * 解码
   * @param  {String} b64 base64位字符串
   * @return {Promise}
   */
  decode: function (b64) {
    var bytes = decodeBase64(b64);
    var msg;
    var output = '';

    var outputArr = bytes.map(function (item) {
      var hex = item.toString(16);
      if (item < 16) {
        hex = '0' + item.toString(16);
      }
      return hex;
    });
    output = outputArr.join(' ');

    if (__DEBUG__) {
      console.log('转为十六进制指令：' + output);
    }

    msg = outputArr.slice(4, -2);

    return new Promise(function (resolve, reject) {
      resolve(msg);
    });
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

module.exports = Util;