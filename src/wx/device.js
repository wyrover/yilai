var Vue = require('vue');

var App = Vue.extend(require('./deviceContent.vue'));
Vue.config.debug=true

new App().$mount('#app');
