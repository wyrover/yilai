var appStore = require('./stores/app');
var JSSDK = require('../shared/libs/jssdk');

var configRouter = function (router) {
  router.map({
    '*': {
      component: require('../shared/views/not-found.vue')
    },

    // 引导提示
    '/guide': {
      component: require('./views/guide.vue')
    },

    // 设备列表
    '/devices': {
      component: require('./views/device/list.vue')
    },

    // 设备控制界面
    '/devices/:deviceId': {
      component: require('./views/device/details.vue')
    },
    // 设备添加界面
    '/devices/add': {
      component: require('./views/device/add.vue')
    },

    // 食物
    '/foods': {
      component: require('./views/food/list.vue')
    },
    // 食物
    '/foods/add': {
      component: require('./views/food/add.vue')
    },
    // 食物
    '/foods/select': {
      component: require('./views/food/select.vue')
    },

    // 食物
    '/foods/edit/:foodId': {
      component: require('./views/food/edit.vue')
    },


    // 历史记录
    '/records': {
      component: require('./views/record/index.vue')
    }
  });

  // 重定向
  // router.redirect({
    // '/': '/guide'
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
            router.go('/guide');
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