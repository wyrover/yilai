var Vue = require('vue');

var VueRouter = require('vue-router');
var App = Vue.extend(require('./app.vue'));
var configRouter = require('./route-config');
var router;

// 加载路由插件
Vue.use(VueRouter);

// 路由
router = new VueRouter({
  // history: true,
  // saveScrollPosition: true
});

configRouter(router);

router.start(App, '#app');;
