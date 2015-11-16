// https://github.com/Marak/faker.js
var faker = require('faker');

var fakeData = {
  app: {
    firstAccess: false
  },
  events: []
};

// 格式化时间
var formatDate = function (d) {
  var year = d.getFullYear();
  var month = d.getMonth();
  var date = d.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (date < 10) {
    date = '0' + date;
  }

  return year + '-' + month + '-' + date;
};

for (var i = 1; i <= 5; i++) {
  var date = faker.date.past();
  // 格式化时间
  date = formatDate(date);
  fakeData.events.push({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    date: date
  });
}

module.exports = fakeData;