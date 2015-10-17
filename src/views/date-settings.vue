<template lang="jade">
section
  #form
    form(action="")
      label.sjlabel 预约时间：
      input#USER_AGE.input(type="date", name="USER_AGE", readonly="", placeholder="预约时间")
      .clear.h10
  .cf_zhouqitit 重复周期：
  ul.cf_zhouqi2
    li
      input#zhouqi_1.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_1")
        em
        | 周一
    li
      input#zhouqi_2.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_2")
        em.ico_dg
        | 周二
    li
      input#zhouqi_3.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_3")
        em
        | 周三
    li
      input#zhouqi_4.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_4")
        em
        | 周四
    li
      input#zhouqi_5.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_5")
        em
        | 周五
    li
      input#zhouqi_6.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_6")
        em
        | 周六
    li
      input#zhouqi_7.radio(name="zhouqi", type="checkbox")
      label.trigger(for="zhouqi_7")
        em
        | 周日
.yutan(style="position:fixed; bottom:0; overflow:hidden; z-index:99; box-shadow:#999 1px 1px 5px")
  a(onclick="end()") 取消
  a(onclick="end()") 确认
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
    var that = this;
  },

  methods: {
  }
};
</script>