export function getLast3Days() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(Date.now() - 60 * 60 * 24 * 1000);
  yesterday.setHours(0, 0, 0, 0);
  const beforeYesterday = new Date(Date.now() - 60 * 60 * 24 * 1000 * 2);
  beforeYesterday.setHours(0, 0, 0, 0);

  return [today, yesterday, beforeYesterday];
}
