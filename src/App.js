import React, { useState } from "react";
import {
  getCurrentWeather,
  getCordinates,
  getHistoricalWeather,
  getForecastWeather,
} from "./services";
import { Logo, WeatherDetails, WeatherIcon, WeatherInfo } from "./components/";

function App() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [weatherData, setWeatherData] = useState([]);
  const [show, setShow] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    setWeatherData([]);

    getCurrentWeather(city).then((res) => {
      const currentWeather = {
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

      setCurrentWeather(currentWeather);
    });

    getCordinates(city).then((res) => {
      const cordinatesInfo = {
        latitude: res[0].lat,
        longitude: res[0].lon,
      };

      callHistoricalAPI(cordinatesInfo);
      callForecastAPI(cordinatesInfo);
    });
  }

  function callHistoricalAPI(cordinatesInfo) {
    const cordinates = cordinatesInfo;
    const previousDays = 5;
    const promises = [];

    for (let i = 1; i <= previousDays; i++) {
      promises.push(handleMultipleRequestsHistorical(i, cordinates));
    }

    Promise.all(promises).then((values) => {
      const weatherInfoArray = values.map((temp, index) => {
        const sortHourTemp = temp.hourly.sort((a, b) => {
          return a.temp < b.temp ? -1 : a.temp < b.temp ? 1 : 0;
        });

        const referenceDay = getReferenceDay(index + 1);
        return {
          date: new Date(referenceDay * 1000).toString().slice(0, 3),
          timestamp: referenceDay * 1000,
          temp_min: sortHourTemp[0].temp,
          temp_max: sortHourTemp[23].temp,
          weatherDescription: temp.current.weather[0].main.toLowerCase(),
        };
      });

      setWeatherData((prevState) => [...prevState, ...weatherInfoArray]);
    });
  }

  function callForecastAPI(cordinatesInfo) {
    const cordinates = cordinatesInfo;
    const dayInMiliseconds = 24 * 60 * 60 * 1000;
    const promises = [];

    for (let i = 0; i <= 6; i++) {
      promises.push(getForecastWeather(cordinates));
    }

    Promise.all(promises).then((values) => {
      const weatherInfoArray = values.map((res, index) => {
        const getTimestamp = +Date.now() + dayInMiliseconds * (index + 1);

        return {
          date: isToday(res, index),
          timestamp: getTimestamp,
          temp_min: res.daily[index].temp.min,
          temp_max: res.daily[index].temp.max,
          weatherDescription: res.current.weather[0].main.toLowerCase(),
        };
      });

      setWeatherData((prevState) => [...prevState, ...weatherInfoArray]);
    });
  }

  function handleMultipleRequestsHistorical(i, cordinates) {
    const referenceDay = getReferenceDay(i);
    return getHistoricalWeather(cordinates, referenceDay);
  }

  function getReferenceDay(i) {
    const todayTimestamp = (+Date.now() / 1000).toFixed(0);
    const dayInSeconds = 24 * 60 * 60;
    return todayTimestamp - dayInSeconds * i;
  }

  function isToday(res, index) {
    if (!index) return "Today";
    else return new Date(res.daily[index].dt * 1000).toString().slice(0, 3);
  }

  const orderWeekInfo = () => {
    const sortArr = weatherData.sort((a, b) => {
      return a.timestamp < b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0;
    });

    return sortArr;
  };

  function applyColors(weatherDescription) {
    if (weatherDescription.includes("clouds")) return "clouds";
    if (weatherDescription.includes("rain")) return "rain";
    if (weatherDescription.includes("snow")) return "snow";
    return "clear";
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
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </label>
        </form>

        <section className="container">
          <section className="resume">
            <WeatherIcon
              weatherDescription={currentWeather.description}
            />
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

            <button onClick={() => setShow(!show)}>
              <span
                className={show ? "toggle-button" : "toggle-button display"}
              >
                {" "}
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
              {" "}
              What is your location?
              <input
                type="text"
                placeholder="Example: Salvador, BR"
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
