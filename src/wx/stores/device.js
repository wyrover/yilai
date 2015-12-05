module.exports = {
  state: {
    food: {},
    weight: 0,
    status: 'disconnected' // [disconnected, connecting, connected]
  },

  setFood: function (food) {
    this.state.food = food;
  },

  setWeight: function (weight) {
    this.state.weight = weight;
  },

  setStatus: function (status) {
    this.state.status = status;
  }
};