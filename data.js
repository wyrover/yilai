// https://github.com/Marak/faker.js
import faker from 'faker';

let fakeData = { events: [] };

const formatDate = d => {
  let year = d.getFullYear();
  let month = d.getMonth();
  let date = d.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (date < 10) {
    date = '0' + date;
  }

  return `${year}-${month}-${date}`;
}

for (let i = 1; i <= 5; i++) {
  let date = faker.date.past();
  // 格式化时间
  date = formatDate(date);
  fakeData.events.push({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    date: date
  });
}

export default fakeData;