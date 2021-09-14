export function getTimestampPast(index) {
  const dayInMiliseconds = 24 * 60 * 60 * 1000;
  return +Date.now() - dayInMiliseconds * index;
}

export function getTimestampFuture(index) {
  const dayInMiliseconds = 24 * 60 * 60 * 1000;
  return +Date.now() + dayInMiliseconds * index;
}

export function isToday(res) {
  const convertMiliToSeconds = 1000;

  const getToday = new Date().toString().slice(0, 10);
  const getDay = new Date(res * convertMiliToSeconds).toString().slice(0, 10);

  if (getToday === getDay) return "Today";
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
