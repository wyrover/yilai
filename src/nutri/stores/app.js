module.exports = {
  state: {
    firstAccessChecked: false // 是否已作初访验证
  },

  /**
   * 标记已作初访验证
   */
  markFirstAccessChecked: function () {
    this.firstAccessChecked = true;
  }
};