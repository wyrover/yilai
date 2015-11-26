module.exports = {
  state: {
    devices: []
  },

  addDevices: function (devices) {
    this.state.devices = this.state.devices.concat(devices);
  }
};