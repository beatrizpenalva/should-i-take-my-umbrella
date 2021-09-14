import {
  isToday,
  getMinAndMaxTemp,
  getTimestampPast,
  getTimestampFuture,
} from "./index";

export function createWeatherObjToday(res) {
  return {
    timeStamp: Date.now(),
    description: res.weather[0].description.toLowerCase(),
    temp: res.main.temp,
    temp_max: res.main.temp_max,
    temp_min: res.main.temp_min,
    humidity: res.main.humidity,
    wind: res.wind.speed,
    sunrise: new Date(res.sys.sunrise * 1000).toString().slice(16, 21),
    sunset: new Date(res.sys.sunset * 1000).toString().slice(16, 21),
  };
}

export function createWeatherObjPast(temp, index) {
  const sortHourTemp = getMinAndMaxTemp(temp);
  const getDate = getTimestampPast(index + 1) / 1000;

  return {
    date: isToday(getDate),
    timestamp: getDate,
    temp_min: sortHourTemp[0].temp,
    temp_max: sortHourTemp[23].temp,
    weatherDescription: temp.current.weather[0].main.toLowerCase(),
  };
}

export function createWeatherObjFuture(res, index) {
  const getDate = res.daily[index].dt;

  return {
    date: isToday(getDate),
    timestamp: getTimestampFuture(index),
    temp_min: res.daily[index].temp.min,
    temp_max: res.daily[index].temp.max,
    weatherDescription: res.current.weather[0].main.toLowerCase(),
  };
}

export function createCordinatesObj(res) {
  return {
    latitude: res[0].lat,
    longitude: res[0].lon,
  };
}
