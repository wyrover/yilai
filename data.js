// https://github.com/Marak/faker.js
var faker = require('faker');
var format = require('date-format');

var fakeData = {
  app: {
    firstAccess: false
  },
  devices: []
};

for (var i = 1; i <= 5; i++) {
  var date = faker.date.past();
  // 格式化时间
  date = format('yyyy-MM-dd hh:mm:ss', date);

  fakeData.devices.push({
    id: i,
    name: faker.lorem.words(),
    mac: faker.random.uuid()
  });
}

module.exports = fakeData;