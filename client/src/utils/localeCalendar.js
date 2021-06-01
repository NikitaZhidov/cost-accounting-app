const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const localeCalendar = {
  localize: {
    month: (n) => months[n],
    day: (n) => days[n],
  },
  formatLong: {},
};

export default localeCalendar;
