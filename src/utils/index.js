export function getTimestampPast(index) {
  const dayInMiliseconds = 24 * 60 * 60 * 1000;
  return +Date.now() - dayInMiliseconds * index;
}

export function getTimestampFuture(index) {
  const dayInMiliseconds = 24 * 60 * 60 * 1000;
  return +Date.now() + dayInMiliseconds * index;
}

export function isToday(res, index) {
  const convertMiliToSeconds = 1000;

  const getToday = new Date().toString();
  const getDay = new Date(res * convertMiliToSeconds).toString();

  if (getToday.slice(0, 10) === getDay.slice(0, 10)) return "Today";
  else return getDay.slice(0, 3);
}

export function getMinAndMaxTemp(temp) {
  return temp.hourly.sort((a, b) => {
    return a.temp < b.temp ? -1 : a.temp < b.temp ? 1 : 0;
  });
}

export function convertTimestamp(i) {
  return (getTimestampPast(i) / 1000).toFixed(0);
}
