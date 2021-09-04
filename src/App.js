import React, { useState } from "react";
import {
  getCurrentWeather,
  getCordinates,
  callHistoricalAPI,
  callForecastAPI,
} from "./services";

import {
  createWeatherObjToday,
  createWeatherObjPast,
  createWeatherObjFuture,
  createCordinatesObj,
} from "./utils/adapter";
import { convertTimestamp, handleError } from "./utils/index";
import { Logo, WeatherDetails, WeatherIcon, WeatherInfo } from "./components/";

function App() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [weatherData, setWeatherData] = useState([]);
  const [show, setShow] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    getCurrentWeather(city)
      .then((res) => {
        if (res.message) handleError(res.message)
        else {
          setCurrentWeather(createWeatherObjToday(res));
          
          getCordinates(city).then((res) => {
            const cordinates = createCordinatesObj(res);
            setWeatherData([]);
            getForecastWeather(cordinates);
            getHistoricalWeather(cordinates);
          });
        }
      })
  }

  function getForecastWeather(cordinates) {
    const forecastDays = 6;
    const promises = [];

    for (let i = 0; i <= forecastDays; i++) {
      promises.push(callForecastAPI(cordinates));
    }
    handleMultiplePromises(promises, createWeatherObjFuture);
  }

  function getHistoricalWeather(cordinates) {
    const previousDays = 5;
    const promises = [];

    for (let i = 1; i <= previousDays; i++) {
      promises.push(callHistoricalAPI(cordinates, convertTimestamp(i)));
    }

    handleMultiplePromises(promises, createWeatherObjPast);
  }

  function handleMultiplePromises(promises, callback) {
    Promise.all(promises).then((values) => {
      const weatherInfoArray = values.map((temp, index) => {
        return callback(temp, index);
      });
      setWeatherData((prevState) => [...prevState, ...weatherInfoArray]);
    });
  }

  const orderWeekInfo = () => {
    return weatherData.sort((a, b) => {
      return a.timestamp < b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0;
    });
  };

  function applyColors(weatherDescription) {
    if (weatherDescription.includes("clouds")) return "clouds";
    else if (weatherDescription.includes("rain")) return "rain";
    else if (weatherDescription.includes("snow")) return "snow";
    else return "clear";
  }

  if (weatherData.length > 0) {
    return (
      <main className={applyColors(currentWeather.description)}>
        <form className="location-info" onSubmit={handleSubmit}>
          <label>
            What is your location?
            <input
              type="text"
              placeholder="Example: Salvador, BR"
              required
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </label>
        </form>

        <section className="container">
          <section className="resume">
            <WeatherIcon weatherDescription={currentWeather.description} />
            <h3>{currentWeather.description}</h3>
          </section>

          <section className="info-container">
            <h1>{Math.round(currentWeather.temp)} ºC</h1>

            <section className="tempeture-info">
              <section>
                <p>min</p>
                <h3>{Math.round(currentWeather.temp_min)}</h3>
              </section>

              <section>
                <p>max</p>
                <h3>{Math.round(currentWeather.temp_max)}</h3>
              </section>
            </section>

            <button
              onClick={() => setShow(!show)}
              className={applyColors(currentWeather.description)}
            >
              <span
                className={show ? "toggle-button" : "toggle-button display"}
              >
                {show ? "More" : "Less"} info
              </span>
              <i
                className={
                  show ? "fas fa-chevron-down" : "fas fa-chevron-down display"
                }
              ></i>
            </button>

            <section
              className={show ? "details-section" : "details-section display"}
            >
              <WeatherDetails
                contents={"Humidity"}
                info={currentWeather.humidity + "%"}
              />

              <WeatherDetails
                contents={"Wind"}
                info={currentWeather.wind + "m/s"}
              />

              <WeatherDetails
                contents={"Sunrise"}
                info={currentWeather.sunrise}
              />

              <WeatherDetails
                contents={"Sunset"}
                info={currentWeather.sunset}
              />
            </section>
          </section>

          <section className="week-section">
            {orderWeekInfo().map((item, index) => {
              return (
                <WeatherInfo
                  key={index}
                  date={item.date}
                  temp_max={item.temp_max}
                  temp_min={item.temp_min}
                  weatherDescription={item.weatherDescription}
                />
              );
            })}
          </section>
        </section>
      </main>
    );
  } else {
    return (
      <main className="default">
        <section className="home-container">
          <h1>Should I take my umbrella?</h1>

          <form className="location-info" onSubmit={handleSubmit}>
            <label>
              What is your location?
              <input
                type="text"
                placeholder="Example: Salvador, BR"
                required
                onChange={(event) => setCity(event.target.value)}
              />
            </label>
          </form>
        </section>

        <Logo />
      </main>
    );
  }
}

export default App;
