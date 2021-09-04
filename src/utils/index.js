export function getTimestampPast(index) {
  const dayInMiliseconds = 24 * 60 * 60 * 1000
  return +Date.now() - (dayInMiliseconds * (index));
}

export  function getTimestampFuture(index) {
  const dayInMiliseconds = 24 * 60 * 60 * 1000  
  return +Date.now() + (dayInMiliseconds * (index));
}

//if tem que ser diferente, pois em uma requisição o item 0 da array é ontem e não hoje
export  function isToday(res, index) {
  const convertMiliToSeconds = 1000;

  if (!index) return "Today";
  else
    return new Date(res * convertMiliToSeconds)
      .toString()
      .slice(0, 3);
}

export function getMinAndMaxTemp(temp) {
  return temp.hourly.sort((a, b) => {
    return a.temp < b.temp ? -1 : a.temp < b.temp ? 1 : 0;
  });
}

export function convertTimestamp(i) {
  return (getTimestampPast(i) / 1000).toFixed(0)
}
