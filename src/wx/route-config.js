var appStore = require('./stores/app');
var JSSDK = require('../shared/libs/jssdk');

var configRouter = function (router) {
  router.map({
    '*': {
      component: require('../shared/views/not-found.vue')
    },

    // 主界面 脂肪秤
    '/fatscale': {
      component: require('./views/fatscale.vue')
    },

    // 设备列表
    '/devices': {
      component: require('./views/device/list.vue')
    },

    // 设备控制界面
    '/devices/:deviceId': {
      component: require('./views/device/details.vue')
    },

    // 食物
    '/foods': {
      component: require('./views/food/list.vue')
    },


    // 历史记录
    '/records': {
      component: require('./views/record/index.vue')
    }
  });

  // 重定向
  // router.redirect({
    // '/': '/fatscale'
  // });

  router.beforeEach(function (transition) {
    if (transition.to.path === '/') {
      if (appStore.state.firstAccessChecked) {
        // 已作初访校验，直接跳转到设备列表页
        router.go('/devices');
      } else {
        // 未作初访校验，应先作一次校验，并根据校验的结果进入相应流程
        JSSDK.getXSystemInfo().then(function (info) {
          appStore.markFirstAccessChecked();
          if (info.firstAccess) {
            router.go('/fatscale');
          } else {
            router.go('/devices');
          }
        });
      }
    } else {
      transition.next();
    }
  });
};

module.exports = configRouter;