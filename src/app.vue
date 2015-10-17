<template lang="jade">
log(v-if="debug", logs="{{logs}}")
<component is="{{currentView}}"></component>
</template>

<script>
var Xlink = require('./xlink');
var components = {};

if (__DEV__) {
  // 开发环境下启用日志记录
  debugLogs = [];
  writeLog = function (log) {
    console.log(log);
    debugLogs.push(log);
  }
  var Log = require('./components/log.vue');
  components.log = Log;
}

module.exports = {
  components: components,

  data: function () {
    var data = {
      currentView: 'home',
      timing: {
        days: [],
        hours: '00',
        minutes: '00'
      },
      error: null,
      BATTERY_STATUS: ['d', 'c', 'b', 'a'],
      COMMAND_INFOS: {
        turnOn:         { size: 1, body: ['3e'], label:'开机' },
        stop:           { size: 1, body: ['3f'], label:'停止' },
        autoClean:      { size: 1, body: ['30'], label:'自动清扫' },
        targetedClean:  { size: 1, body: ['31'], label:'定点清扫' },
        autoCharge:     { size: 1, body: ['32'], label:'自动回充' },
        moveForward:    { size: 1, body: ['33'], label:'向前移动' },
        moveBackward:   { size: 1, body: ['34'], label:'向后移动' },
        moveLeft:       { size: 1, body: ['35'], label:'向左移动' },
        moveRight:      { size: 1, body: ['36'], label:'向右移动' },
        queryBattery:   { size: 1, body: ['51'], label:'电量查询' },
        queryTiming:    { size: 1, body: ['56'], label:'预约查询' },
        setTiming:      { size: 1, body: ['57'], label:'定时设置' },
        setBattery:     { size: 1, body: ['52'], label:'电量设置' }
      },
      MESSAGES: {
        'zh_cn': {
          ui: {
            batteryLeft:      '剩余电量',
            currentMode:      '当前模式',
            connectingStatus: '连接状态',
            timing:           '预约定时',
            functions:        '功能',
            autoClean:        '自动清扫',
            targetedClean:    '定点清扫',
            autoCharge:       '自动回充',
            timingClean:      '预约清扫',
            ok:               '确认',
            stop:             '停止',
            deviceName:       '扫地机器人'
          },
          modes: {
            stopped:          '停止',
            error1:           'E01',
            error2:           'E02',
            error3:           'E03',
            error4:           'E04',
            error5:           'E05',
            autoCleaning:     '自动清扫',
            targetedCleaning: '定点清扫',
            goCharging:       '回充',
            charging:         '充电'
          },
          connectingStatus: ['未连接', '已连接'],
        },
        'en': {
          ui: {
            batteryLeft:      'Battery',
            currentMode:      'Mode',
            connectingStatus: 'Status',
            timing:           'Timing',
            functions:        'Functions',
            autoClean:        'Auto',
            targetedClean:    'Targeted',
            autoCharge:       'Charge',
            timingClean:      'Appoitment',
            ok:               'OK',
            stop:             'Stop',
            deviceName:       'Cleaning machine'
          },
          modes: {
            stopped:          'Stopped',
            error1:           'E01',
            error2:           'E02',
            error3:           'E03',
            error4:           'E04',
            error5:           'E05',
            autoCleaning:     'Auto cleaning',
            targetedCleaning: 'Targeted cleaning',
            goCharging:       'Go charging',
            charging:         'Charging'
          },
          connectingStatus: ['Disconnected', 'Connected']
        }
      },
      lang: 'zh_cn',
      debug: __DEV__
    };

    if (__DEV__) {
      data.logs = debugLogs;
    }

    return data;
  },

  ready: function () {
    var lang = Xlink.getQueryString('lang');

    if (lang) {
      this.lang = lang;
    }
  }
};
</script>