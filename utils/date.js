function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function getDateByLocaleString(str) {
  const [month, day, year] = str.split("-");
  let dateInstance = new Date();
  dateInstance.setUTCFullYear(year);
  dateInstance.setUTCMonth(+month - 1);

  //? In the database, the day is recorded 1 less
  dateInstance.setUTCDate(+day - 1);

  //? In the database, the hours is equal 21
  dateInstance.setUTCHours(21);

  dateInstance.setUTCMinutes(0);
  dateInstance.setUTCSeconds(0);
  dateInstance.setUTCMilliseconds(0);

  return dateInstance;
}

module.exports = {
  isValidDate,
  getDateByLocaleString,
};
