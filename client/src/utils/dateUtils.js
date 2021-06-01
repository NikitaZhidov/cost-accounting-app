const monthNames = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
const dayNames = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

const todayString = "Сегодня";
const yesterdayString = "Вчера";
const beforeYesterdayString = "Позавчера";

export const getCorrectDateString = (dateString, isOnlyComing = false) => {
  let newDateString = "";
  if (
    new Date(Date.now()).toLocaleDateString() ===
    new Date(dateString).toLocaleDateString()
  ) {
    newDateString = todayString;
  } else {
    newDateString =
      new Date(dateString).getDate() +
      " " +
      monthNames[new Date(dateString).getMonth()] +
      ", ";
    if (
      new Date(Date.now()).getFullYear() === new Date(dateString).getFullYear()
    ) {
      newDateString += dayNames[new Date(dateString).getDay()];
    } else {
      newDateString += " " + new Date(dateString).getFullYear().toString();
    }
  }

  let tempDate = new Date();
  tempDate.setDate(tempDate.getDate() - 1);

  if (
    new Date(tempDate).toLocaleDateString() ===
    new Date(dateString).toLocaleDateString()
  ) {
    newDateString = yesterdayString;
  }

  tempDate.setDate(tempDate.getDate() - 1);

  if (
    new Date(tempDate).toLocaleDateString() ===
    new Date(dateString).toLocaleDateString()
  ) {
    newDateString = beforeYesterdayString;
  }

  if (isOnlyComing) {
    if (
      newDateString !== beforeYesterdayString &&
      newDateString !== yesterdayString &&
      newDateString !== todayString
    ) {
      return newDateString.split(", ")[0];
    }
  }

  return newDateString;
};

export const getFormattedDateString = (date) => {
  if (date === null) return null;
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
  const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  const fullYear = date.getFullYear();

  return [month, day, fullYear].join("-");
};

export function getBeforeDateString(countDays) {
  const now = new Date();
  now.setDate(now.getDate() - countDays);

  return now;
}
