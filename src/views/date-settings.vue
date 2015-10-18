<template lang="jade">
section
  #form
    form(action="")
      label.sjlabel(v-text="MESSAGES[lang].ui.apppoitment + ':'")
      input#USER_AGE.input(type="time", placeholder="预约时间", v-model="timing")
      .clear.h10
  .cf_zhouqitit(v-text="MESSAGES[lang].ui.repeatCycle + ':'")
  ul.cf_zhouqi2
    li
      input#zhouqi_1.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_1")
        em
        span(v-text="MESSAGES[lang].ui.monday")
    li
      input#zhouqi_2.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_2")
        em
        span(v-text="MESSAGES[lang].ui.tuesday")
    li
      input#zhouqi_3.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_3")
        em
        span(v-text="MESSAGES[lang].ui.wednesday")
    li
      input#zhouqi_4.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_4")
        em
        span(v-text="MESSAGES[lang].ui.thursday")
    li
      input#zhouqi_5.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_5")
        em
        span(v-text="MESSAGES[lang].ui.friday")
    li
      input#zhouqi_6.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_6")
        em
        span(v-text="MESSAGES[lang].ui.saturday")
    li
      input#zhouqi_7.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_7")
        em
        span(v-text="MESSAGES[lang].ui.sunday")
.yutan
  button(v-text="MESSAGES[lang].ui.cancel")
  button(v-text="MESSAGES[lang].ui.ok")
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

    // 发送一次预约查询指令
    this.sendCommand('queryTiming');
  },

  methods: {

  }
};
</script>