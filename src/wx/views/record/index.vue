<template lang="jade">
.main-content.with-foot-actions
    // 历史记录列表
    record-detail(:records="records")

    // 没有历史记录
    .record-null(v-show="false")
      p 没有历史记录

    // 右侧按钮
    side-action(:isShowSideAction="false")
      div.btn-actions
        button.btn-side.btn-add Total
        button.btn-side.btn-add Date
</template>

<style lang="stylus">
  @import '../../../shared/assets/stylus/common'
</style>

<script>
  var recordDetail = require('../../../shared/components/record-detail.vue')
  var sideAction = require('../../../shared/components/side-action.vue')
  module.exports = {
    components: {
      'record-detail': recordDetail,
      'side-action': sideAction
    },

    data: function () {
      return {
        records: [],
        expand: false,
        isShowSideAction: false
      }
    },

    conputed: {
      returnMonthDay: function () {
      }
    },

    route: {
      data: function (transition) {
        return {
          records: this.fetchRecords()
        }
      }
    },

    methods: {
      fetchRecords: function () {
        if (__DEBUG__) {
          return new Promise(function (resolve, reject) {
            resolve([{
              day: '2015-11-26',
              time: '15:26',
              name: 'Beer',
              weight: 2,
              heat: 1000,
              protein: 30.8,
              fat: 1.2,
              chol: 0.8,
              sugar: 50,
              fibrin: 103,
              natrium: 0.5,
              times: 5
            }, {
              day: '2015-11-25',
              time: '11:26',
              name: 'Apple',
              weight: 2,
              heat: 1000,
              protein: 30.8,
              fat: 1.2,
              chol: 0.8,
              sugar: 50,
              fibrin: 103,
              natrium: 0.5,
              times: 5
            }, {
              day: '2015-12-01',
              time: '11:26',
              name: 'Pear',
              weight: 2,
              heat: 1000,
              protein: 30.8,
              fat: 1.2,
              chol: 0.8,
              sugar: 50,
              fibrin: 103,
              natrium: 0.5,
              times: 5
            }]);
          });
        }
        return Promise.resolve($.ajax({
          url: '',
          type: 'get'
        }));
      }

    }
  }
</script>