<template lang="jade">
section
  .state
    .seebest
      em.em1
    dl
      dt(v-text="MESSAGES[lang].ui.batteryLeft")
      dd
        em(v-class="'battery_' + BATTERY_STATUS[battery]")
    dl.fr
      dt(v-text="MESSAGES[lang].ui.currentMode")
      dd(v-text="MESSAGES[lang].modes[mode]")
    dl
      dt(v-text="MESSAGES[lang].ui.connectingStatus")
      dd(v-text="MESSAGES[lang].connectingStatus[connected]")
    dl.fr
      dt(v-text="MESSAGES[lang].ui.timing")
      dd
        span(v-text="timing")
  div
    // 模式选择
    h1.title(v-text="MESSAGES[lang].ui.functions")
    ul.func
      li(v-on="click: autoClean", v-class="autoCleaning ? 'checked' : ''")
        label.trigger
          em.ico1
          span(v-text="MESSAGES[lang].ui.autoClean")
      li(v-on="click: targetedClean", v-class="targetedCleaning ? 'checked' : ''")
        label.trigger
          em.ico2
          span(v-text="MESSAGES[lang].ui.targetedClean")
      li(v-on="click: autoCharge", v-class="autoCharging ? 'checked' : ''")
        label.trigger
          em.ico3
          span(v-text="MESSAGES[lang].ui.autoCharge")
      li
        a.trigger(href="#/date-settings")
          em.ico4
          span(v-text="MESSAGES[lang].ui.timingClean")
    // 方向控制
    .direction_box
      .direction
        button.arrow.jt1#upButton(data-action="moveForward")
        button.arrow.jt2#rightButton(data-action="moveRight")
        button.arrow.jt3#downButton(data-action="moveBackward")
        button.arrow.jt4#leftButton(data-action="moveLeft")
        button.txtqr(v-text="MESSAGES[lang].ui.ok")
.footbut
  button(v-on="click: sendCommand('stop')", v-text="MESSAGES[lang].ui.stop")

//- 蒙版
.modal(v-class="hidden: connected")

//- 提示对话框
.modal(v-class="hidden: !error")
  .modal-dialog
    .modal-body(v-text="error")
    .modal-footer
      button(v-on="click: hideError", v-text="MESSAGES[lang].ui.ok")

//- 设备列表选择
//-
  .modal.modal-device-list(v-show="!error && !deviceId")
    .modal-dialog
      .modal-body
        .device-list
          ul
            li(v-repeat="device in devices")
              label
                input(type="radio", v-modal="deviceId", value="{{device.deviceID}}")
                span(v-text="MESSAGES[lang].ui.deviceName + ($index + 1)")

//- .mengban_off(style="display:none")
//- 加载动画
//- .loader(style="display:none")
  .ball-beat
    div
    div
    div
</template>

<script>
var Promise = require('lie');
var Xlink = require('../xlink');

module.exports = {
  inherit: true,

  components: {
  },

  data: function () {
    return {
      battery: 0,
      mode: 'stopped',
      autoCleaning: 0,
      targetedCleaning: 0,
      autoCharging: 0,
      interval: null
    };
  },

  ready: function () {
    var _that = this;

    // 初始化设备状态
    // 流程：
    // 1. 获取 OpenId
    //    ├── 成功：如果返回状态码为200，进入第2步；否则，错误处理
    //    └── 失败：错误处理
    // 2. 获取设备列表
    //    ├── 成功：如果返回状态码为200，进入第3步；否则，错误处理
    //    └── 失败：错误处理
    // 3. 连接设备
    //    ├── 成功：如果返回状态码为200，进入第4步；否则，错误处理
    //    └── 失败：错误处理
    // 4. 获取设备状态
    //    ├── 成功：如果返回状态码为200，进入第5步；否则，错误处理
    //    └── 失败：错误处理
    // 5. 初始化设备状态
    this.init();

    // 监听设备状态变更
    XJSObject.on('onXDeviceStateChange', function(r) {
      if (r.deviceid == Xlink.deviceId && r.state == 0) {
        if (__DEV__) {
          writeLog('设备下线');
        }
        _that.connected = 0;

        if (__DEV__) {
          writeLog('重新连接...');
        }
        _that.reconnect();
      } else if (r.deviceid == Xlink.deviceId && r.state == 1) {
        if (__DEV__) {
          writeLog('设备上线');
        }
        _that.connected = 1;
      }
    });

    // 监听服务器返回的应答数据
    XJSObject.on('onRecvXDeviceData', function (r) {
      if (r.type == 'datapoint') {
        var data = r.data;
        var datapoint = data.datapoint;
        for (var i = 0; i < datapoint.length; i++) {
          switch (datapoint[i].index) {
          case 0: //led灯
            break;
          }
        }
      } else if(r.type == 'base64') {
        var b64 = r.data;

        if (__DEV__) {
          writeLog('--------------------------------------');
          writeLog('收到设备应答数据：' + b64);
        }

        // 将收到设备发过来的信息解码，执行相应的操作
        Xlink.decode(b64).then(function (data) {
          var operate, params;

          switch (data[0]) {
            // 故障提交
            case '53':
              params = data.slice(1);
              if (__DEV__) {
                writeLog('执行指令对应操作：updateMode(' + params.toString() +')');
              }
              _that.updateMode(params);
              break;

            // 电量提交
            case '52':
              params = data.slice(1);
              if (__DEV__) {
                writeLog('设备提交电量数据，执行指令对应操作：setBattery(' + params + ')');
              }
              _that.setBattery(params);
              break;

            // 预约提交
            case '57':
              params = data.slice(1);
              if (__DEV__) {
                writeLog('设备提交预约数据，执行指令对应操作：setTiming(' + params + ')');
              }
              _that.setTiming(params);
              break;

            // 应答指令
            default:
              for(key in _that.COMMAND_INFOS){
                if (data[1].toString(16) === _that.COMMAND_INFOS[key].body[0].toString()) {
                  operate = _that[key];
                  break;
                }
              }

              if (data.length > 2) {
                if (__DEV__) {
                  writeLog('设备提交数据，执行指令对应操作：' + key);
                }
                params = data.slice(2);
                operate(params);
              }
              break;
          }
        });
      }
    });

    // 方向键长按事件绑定
    $('#upButton, #rightButton, #downButton, #leftButton').on('touchstart', function (e) {
      e.preventDefault();
      _that.onHold(e);
    }, false);

    $('#upButton, #rightButton, #downButton, #leftButton').on('touchend', function (e) {
      _that.touchEnd(e);
    }, false);

  },

  methods: {
    // 初始化
    init: function () {
      var _that = this;

      Xlink.init().then(function (data) {
        // 更改连接状态
        _that.connected = 1;

        // 发送一次电量查询指令
        _that.sendCommand('queryBattery');

        // TODO: 发送一次校时指令
        _that.sendFixTimeCommand();

        // 发送一次预约查询指令
        _that.sendCommand('queryTiming');

      }).catch(function (error) {
        _that.error = JSON.stringify(error);
      });
    },

    // 重新连接
    reconnect: function () {
      Xlink.connectDevice().then(function (data) {
        // body...
      }).catch(function (error) {
        _that.error = JSON.stringify(error);
      });
    },

    // 开机
    turnOn: function () {
      this.mode = 'autoCleaning';
    },

    // 关机
    stop: function () {
      this.mode = 'stopped';
    },

    // 长按
    onHold: function (e) {
      var _that = this;
      var action = e.target.getAttribute('data-action')
      var command = Xlink.genCommand(this.COMMAND_INFOS[action]);

      Xlink.send(command);
      this.interval = window.setInterval(function () {
        Xlink.send(command);
      }, 400);

    },

    // 松开
    touchEnd: function (event) {
      this.endTimer();
    },

    //取消定时器
    endTimer: function () {
      if(this.interval!=null){
        clearInterval(this.interval);
        this.interval = null;
      }
    },

    // 发送校时指令
    sendFixTimeCommand: function () {
      var msg = { size: 4, body: [], label: "校时" };
      var today = new Date();
      var day = today.getDay();
      var hours = today.getHours();
      var minutes = today.getMinutes();
      var command;

      msg.body.push('4f');

      if (day === 0) {
        day = 7;
      }

      if (hours < 10) {
        hours = '0' + hours;
      }

      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      day = '0' + day;
      hours = hours.toString();
      minutes = minutes.toString();

      msg.body = msg.body.concat([day, hours, minutes]);
      command = Xlink.genCommand(msg);
      Xlink.send(command);
    },

    // 自动清扫
    autoClean: function () {
      this.setStatus([1, 0, 0]);
      this.sendCommand('autoClean');
    },

    // 定点清扫
    targetedClean: function () {
      this.setStatus([0, 1, 0]);
      this.sendCommand('targetedClean');
    },

    // 自动回充
    autoCharge: function () {
      this.setStatus([0, 0, 1]);
      this.sendCommand('autoCharge');
    },

    // 设置电量
    setBattery: function (data) {
      this.battery = parseInt(data[0]);
    },

    // 设置状态
    setStatus: function (status) {
      this.autoCleaning = status[0];
      this.targetedCleaning = status[1];
      this.autoCharging = status[2];
    },

    // 模式和状态更新
    updateMode: function (data) {
      switch (data[0]) {
        case '01':
          this.mode = 'error1';
          this.setStatus([0, 0, 0]);
          break;
        case '02':
          this.mode = 'error2';
          this.setStatus([0, 0, 0]);
          break;
        case '03':
          this.mode = 'error3';
          this.setStatus([0, 0, 0]);
          break;
        case '04':
          this.mode = 'error4';
          this.setStatus([0, 0, 0]);
          break;
        case '05':
          this.mode = 'error5';
          this.setStatus([0, 0, 0]);
          break;
        case '60':
          this.mode = 'targetedCleaning';
          this.setStatus([0, 1, 0]);
          break;
        case '61':
          this.mode = 'autoCleaning';
          this.setStatus([1, 0, 0]);
          break;
        case '62':
          this.mode = 'goCharging';
          this.setStatus([0, 0, 1]);
          break;
        case '63':
          this.mode = 'charging';
          this.setStatus([0, 0, 1]);
          break;
        default:
          this.mode = 'stopped';
          this.setStatus([0, 0, 0]);
          break;
      }
    },

    hideError: function () {
      this.error = null;
    }

  }
};
</script>