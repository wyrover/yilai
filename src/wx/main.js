var Vue = require('vue');

var VueRouter = require('vue-router');
var App = Vue.extend(require('./app.vue'));
var configRouter = require('./route-config');
var VueResource = require('vue-resource');
var i18n = require('vue-i18n');
var router;
var vueForm = require('vue-form');

// 加载路由插件
Vue.use(VueRouter);

// 表单验证插件
Vue.use(vueForm);

// 数据请求插件
Vue.use(VueResource);

// 翻译插件
// https://github.com/kazupon/vue-i18n
Vue.use(i18n, {
  lang: 'zh_cn',
  locales: require('./consts/locales')
});

// 路由
router = new VueRouter({
  // history: true,
  // saveScrollPosition: true
});

configRouter(router);

router.start(App, '#app');