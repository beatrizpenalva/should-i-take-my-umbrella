export function getCurrentWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&units=metric&APPID=7c8b054ddd8f88293b1e0e10e75ba18d`
  )
}

export function getCordinates(city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=7c8b054ddd8f88293b1e0e10e75ba18d`
  )
};

export function getHistoricalWeather(cordinates, referenceDay) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${cordinates.latitude}&lon=${cordinates.longitude}&dt=${referenceDay}&units=metric&appid=7c8b054ddd8f88293b1e0e10e75ba18d`
  )
}

export function getForecastWeather(cordinates) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinates.latitude}&lon=${cordinates.longitude}&units=metric&appid=7c8b054ddd8f88293b1e0e10e75ba18d`
  )
}
  