var Vue = require('vue');

// https://github.com/flatiron/director
var Router = require('director').Router;

var appOptions = require('./app.vue');
// 页面视图参数
var homeOptions = require('./views/home.vue');
var dateSettingsOptions = require('./views/date-settings.vue');

var app, router, homeHandler, dateSettingsHandler;

// 注册页面视图组件
Vue.component('home', homeOptions);
Vue.component('date-settings', dateSettingsOptions);

// 应用挂载到 DOM
app = new Vue(appOptions).$mount('#app');

// 页面路由逻辑处理
// ------------------------------
homeHandler = function () {
  app.currentView = 'home';
};

dateSettingsHandler = function () {
  app.currentView = 'date-settings';
};

// 路由
router = new Router({
  '/': homeHandler,
  '/date-settings': dateSettingsHandler
});
router.init();
