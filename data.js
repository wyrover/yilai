// https://github.com/Marak/faker.js
var faker = require('faker');
var format = require('date-format');

var fakeData = {
  app: {
    firstAccess: false
  },
  devices: [],
  systemFoods: [],
  foods: []
};

for (var i = 1; i <= 5; i++) {
  var date = faker.date.past();
  // 格式化时间
  date = format('yyyy-MM-dd hh:mm:ss', date);

  fakeData.devices.push({
    id: i,
    name: faker.lorem.words().join(' '),
    mac: faker.internet.mac()
  });
}

for (var i = 1; i <= 5; i++) {
  fakeData.foods.push({
    name: faker.commerce.productName(),
    weight: faker.random.number(),
    heat: faker.random.number(),
    protein: faker.random.number(),
    fat: faker.random.number(),
    chol: faker.random.number(),
    sugar: faker.random.number(),
    fibrin: faker.random.number(),
    natrium: faker.random.number()
  })
}

for (var i = 1; i <= 5; i++) {
  fakeData.systemFoods.push({
    name: faker.commerce.productName(),
    weight: faker.random.number(),
    heat: faker.random.number(),
    protein: faker.random.number(),
    fat: faker.random.number(),
    chol: faker.random.number(),
    sugar: faker.random.number(),
    fibrin: faker.random.number(),
    natrium: faker.random.number()
  })
}


module.exports = fakeData;