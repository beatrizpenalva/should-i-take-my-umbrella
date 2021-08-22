import React, { useState } from "react";
import WeatherInfo from "./components/WeatherInfo/index";
import WeatherDetails from "./components/WeatherDetails/index";
// import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
//informações sobre o sol

  const currentWeather = (e) => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&units=metric&APPID=7c8b054ddd8f88293b1e0e10e75ba18d`
    )
      .then((response) => response.json())
      .then((res) => {

        const weatherInfo = {
          description: res.weather[0].description,
          icon: res.weather[0].icon,
          temp: res.main.temp,
          temp_max: res.main.temp_max,
          temp_min: res.main.temp_min,

          humidity: res.main.humidity,
          pressure: res.main.pressure,
          wind: res.wind.speed,
        }

        setWeather(weatherInfo)
        getCordinates(city)
      });
  };

  const getCordinates = (location) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=7c8b054ddd8f88293b1e0e10e75ba18d`)
    .then((response) => response.json())
    .then((res) => console.log(res))

  }

  // const callAPI = (lat, lon) => {
  //   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=7c8b054ddd8f88293b1e0e10e75ba18d`)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       console.log(res)
  //     })
  // }
  
  const setCityInput = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <form className="location-info" onSubmit={currentWeather}>
        <label>
          What is your location?
          <input
            type="text"
            placeholder="Example: Salvador, BR"
            onChange={setCityInput}
          />
        </label>
      </form>

      <section className="container">
        <section className="resume">
          <i className="fas fa-circle"></i>
          <h3>{weather.description}</h3>
        </section>

        <section className="info-container">
          <h1>{Math.round(weather.temp)} ºC</h1>
          <section className="tempeture-info">
            <section>
              <p>min</p>
              <h3>{Math.round(weather.temp_min)} ºC</h3>
            </section>

            <section>
              <p>max</p>
              <h3>{Math.round(weather.temp_max)} ºC</h3>
            </section>
          </section>

          <button className="toggle-button">
            More info<i className="fas fa-chevron-down"></i>
          </button>
          <section className="details-section">
            <WeatherDetails contents={"Humidity"} info={weather.humidity + "%"}/>
            <WeatherDetails contents={"Pressure"} info={weather.pressure + "hPa"}/>
            <WeatherDetails contents={"Wind"} info={weather.wind + "m/s"}/>
          </section>
        </section>

        <section className="week-section">
          <WeatherInfo />
          <WeatherInfo />
          <WeatherInfo />
          <WeatherInfo />
          <WeatherInfo />
          <WeatherInfo />
          <WeatherInfo />
          <WeatherInfo />
          <WeatherInfo />
          <WeatherInfo />
          <WeatherInfo />
          <WeatherInfo />
        </section>
      </section>
    </>
  );
}

export default App;
