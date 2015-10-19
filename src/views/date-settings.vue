<template lang="jade">
section
  #form
    form(action="")
      label.sjlabel(v-text="MESSAGES[lang].ui.appointment + ':'")
      input#USER_AGE.input(type="time", placeholder="预约时间", v-model="timing")
      .clear.h10
  .cf_zhouqitit(v-text="MESSAGES[lang].ui.repeatCycle + ':'")
  ul.cf_zhouqi2
    li(v-class="checked: cycle[0]")
      input#zhouqi_1.radio(name="zhouqi", type="checkbox", v-model="cycle[0]")
      label.trigger(for="zhouqi_1")
        em
        span(v-text="MESSAGES[lang].ui.monday")
    li(v-class="checked: cycle[1]")
      input#zhouqi_2.radio(name="zhouqi", type="checkbox", v-model="cycle[1]", value="red")
      label.trigger(for="zhouqi_2")
        em
        span(v-text="MESSAGES[lang].ui.tuesday")
    li(v-class="checked: cycle[2]")
      input#zhouqi_3.radio(name="zhouqi", type="checkbox", v-model="cycle[2]")
      label.trigger(for="zhouqi_3")
        em
        span(v-text="MESSAGES[lang].ui.wednesday")
    li(v-class="checked: cycle[3]")
      input#zhouqi_4.radio(name="zhouqi", type="checkbox", v-model="cycle[3]")
      label.trigger(for="zhouqi_4")
        em
        span(v-text="MESSAGES[lang].ui.thursday")
    li(v-class="checked: cycle[4]")
      input#zhouqi_5.radio(name="zhouqi", type="checkbox", v-model="cycle[4]")
      label.trigger(for="zhouqi_5")
        em
        span(v-text="MESSAGES[lang].ui.friday")
    li(v-class="checked: cycle[5]")
      input#zhouqi_6.radio(name="zhouqi", type="checkbox", v-model="cycle[5]")
      label.trigger(for="zhouqi_6")
        em
        span(v-text="MESSAGES[lang].ui.saturday")
    li(v-class="checked: cycle[6]")
      input#zhouqi_7.radio(name="zhouqi", type="checkbox", v-model="cycle[6]")
      label.trigger(for="zhouqi_7")
        em
        span(v-text="MESSAGES[lang].ui.sunday")
.yutan
  button(v-text="MESSAGES[lang].ui.cancel", v-on="click: cancelTiming")
  button(v-text="MESSAGES[lang].ui.ok", v-on="click: submitTiming")
</template>

<script>
// var Promise = require('lie');
// var Loading = require('../components/loading.vue');
var Xlink = require('../xlink');

module.exports = {
  inherit: true,

  components: {
  },

  data: function () {
    return {
      battery: 0
    };
  },

  ready: function () {
    var _that = this;
    // writeLog(this.cycle);

    // 发送一次预约查询指令
    // this.sendCommand('queryTiming');
  },

  methods: {
    submitTiming: function () {
      var _that = this;
      var command, i, commandByte;
      var msg = { size: 4, body: [], label: "预约" };

      // 消息体-命令位
      msg.body.push('40');

      // 消息体-命令位
      // msg.body.push
      for(i=0; i<7; i++) {
        if(this.cycle[i] !== true) {
          break;
        }
      }

      // 如果7天都有预约，则最后一位为真
      if (i === 7) {
        this.cycle[7] = true;
      } else {
        this.cycle[7] = false;
      }

      commandByte = this.cycle.map(function (item) {
        return Number(item);
      }).reverse().join('');

      commandByte = parseInt(commandByte, 2).toString(16);

      if(parseInt(commandByte) < 10) {
        commandByte = '0' + commandByte;
      }

      msg.body.push(commandByte);

      // 消息体-时分
      msg.body = msg.body.concat(this.timing.split(':'));

      command = Xlink.genCommand(msg);
      Xlink.send(command).then(function(){
        _that.returnHome();
      });
    },

    cancelTiming: function () {
      this.returnHome();
    },

    returnHome: function () {
      window.location.href = '#/';
    }
  }
};
</script>