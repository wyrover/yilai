var config = {
  apiRoot: 'http://plugin.xlink.cn'
};

var Promise = require('promise');
var Vue = require('vue');
var VueResource = require('vue-resource');
Vue.use(VueResource);

module.exports = {
  wxmsg: require('./api/wxmsg')(Vue, Promise, config),
  BluetoothScale: require('./api/BluetoothScale')(Vue, Promise, config)
}