var config = {
  apiRoot: 'http://42.121.122.228:8887/v2',
  verifycodeDuration: 90,
  pageCount: 10
};

var Promise = require('promise');
var Vue = require('vue');
var VueResource = require('vue-resource');
Vue.use(VueResource);

module.exports = {
  wxmsg: require('./api/wxmsg')(Vue, Promise, config)
}