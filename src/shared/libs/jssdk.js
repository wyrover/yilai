var Promise = require('promise');

module.exports = {
  openXDeviceLib: function () {
  },

  /**
   * 获取手机和WEB容器信息
   * @return {Promise}
   */
  getXSystemInfo: function () {
    return new Promise(function (resolve, reject) {
      resolve({
        firstAccess: true
      });
    });
  }
};