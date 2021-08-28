export function getCurrentWeather(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&units=metric&APPID=7c8b054ddd8f88293b1e0e10e75ba18d`
  )
    .then((response) => response.json())
}

export function getCordinates(city) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=7c8b054ddd8f88293b1e0e10e75ba18d`
  )
    .then((response) => response.json())
};

export function getHistoricalWeather(cordinates, referenceDay) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${cordinates.latitude}&lon=${cordinates.longitude}&dt=${referenceDay}&units=metric&appid=7c8b054ddd8f88293b1e0e10e75ba18d`
  )
    .then((response) => response.json())
}

export function getForecastWeather(cordinates) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinates.latitude}&lon=${cordinates.longitude}&units=metric&appid=7c8b054ddd8f88293b1e0e10e75ba18d`
  )
    .then((response) => response.json())
}
  