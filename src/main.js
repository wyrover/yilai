if (__DEV__) {
  debug = require('./debug');
}
var Vue = require('vue');
var resource = require('vue-resource');
var Router = require('director').Router;
var appOptions = require('./app.vue');
// 页面视图参数
var homeOptions = require('./views/home.vue');
var eventsOptions = require('./views/events.vue');

var app, router, homeHandler, eventsHandler;

// 注册页面视图组件
Vue.component('home', homeOptions);
Vue.component('events', eventsOptions);

// 应用挂载到 DOM
app = new Vue(appOptions).$mount('#app');

// 页面路由逻辑处理
// ------------------------------
homeHandler = function () {
  app.currentView = 'home';
};

eventsHandler = function () {
  app.currentView = 'events';
};

// 路由
router = new Router({
  '/': homeHandler,
  '/events': eventsHandler
});
router.init();
