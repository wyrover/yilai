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
    // '/': '/guide'
  // });

  router.beforeEach(function (transition) {
    if (transition.to.path === '/') {
      // 未作初访校验，应先作一次校验，并根据校验的结果进入相应流程
      JSSDK.getXSystemInfo().then(function (info) {
        appStore.markFirstAccessChecked();
        if (info.firstAccess) {
          router.go('/fatscale');
        } else {
          router.go('/devices');
        }
      });
    } else {
      transition.next();
    }
  });
};

module.exports = configRouter;