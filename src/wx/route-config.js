var appStore = require('./stores/app');
var JSSDK = require('../shared/libs/jssdk');

var configRouter = function (router) {
  router.map({
    '*': {
      component: require('../shared/views/not-found.vue')
    },

    // 主界面 脂肪秤 从消息推送进入
    '/fatscale': {
      component: require('./views/fatscale.vue')
    },
    // 设置页面
    '/setting': {
      component: require('./views/setting/index.vue')
    },
    // 设置页面-个人信息
    '/setting/information': {
      component: require('./views/setting/information.vue')
    },
    // 设置页面-设备管理
    '/setting/equipment': {
      component: require('./views/setting/equipment/list.vue')
    },
    // 设置页面-详情
    '/setting/equipment/:device_id': {
      component: require('./views/setting/equipment/details.vue')
    },
    // 设置页面-详情-用户
    '/setting/equipment/details/users': {
      component: require('./views/setting/equipment/users.vue')
    },
    // 设置页面-详情-帮助
    '/setting/equipment/details/help': {
      component: require('./views/setting/equipment/help.vue')
    },
    // 设置页面-历史记录
    '/setting/history': {
      component: require('./views/setting/history.vue')
    },
    // 图表页面
    '/chart': {
      component: require('./views/chart/index.vue')
    },





  });

  // 重定向
  router.redirect({
    '/': '/fatscale'
  });


};

module.exports = configRouter;