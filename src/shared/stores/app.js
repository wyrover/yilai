module.exports = {
  state: {
    isModalVisible: false,
    modalMsg: ''
  },

  hideModal: function () {
    this.state.isModalVisible = true;
  }
}