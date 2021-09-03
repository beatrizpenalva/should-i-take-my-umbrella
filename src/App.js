import React, { useState } from "react";
import {
  getCurrentWeather,
  getCordinates,
  getHistoricalWeather,
  getForecastWeather,
} from "./services";
import {
  getTimestampPast,
  getTimestampFuture,
  isToday,
  getMinAndMaxTemp,
} from "./utils";
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
        setWeatherData([]);
        setCurrentWeather(createWeatherObjToday(res));
      })

    getCordinates(city).then((res) => {
      const cordinatesInfo = {
        latitude: res[0].lat,
        longitude: res[0].lon,
      };
      callForecastAPI(cordinatesInfo);
      callHistoricalAPI(cordinatesInfo);
    });
  }

  function callForecastAPI(cordinatesInfo) {
    const cordinates = cordinatesInfo;
    const forecastDays = 6;
    const promises = [];

    for (let i = 0; i <= forecastDays; i++) {
      promises.push(getForecastWeather(cordinates));
    }
    createWeatherObj(promises);
  }

  function callHistoricalAPI(cordinatesInfo) {
    const cordinates = cordinatesInfo;
    const previousDays = 5;
    const promises = [];

    for (let i = 1; i <= previousDays; i++) {
      const fixErr = (getTimestampPast(i) / 1000).toFixed(0);
      promises.push(getHistoricalWeather(cordinates, fixErr));
    }

    createWeatherOjcPast(promises);
  }

  function createWeatherObjToday(res) {
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

  function createWeatherOjcPast(promises) {
    Promise.all(promises).then((values) => {
      const weatherInfoArray = values.map((temp, index) => {
        const sortHourTemp = getMinAndMaxTemp(temp);
        const getDate = getTimestampPast(index + 1) / 1000;

        return {
          date: isToday(getDate, index),
          timestamp: getDate,
          temp_min: sortHourTemp[0].temp,
          temp_max: sortHourTemp[23].temp,
          weatherDescription: temp.current.weather[0].main.toLowerCase(),
        };
      });

      setWeatherData((prevState) => [...prevState, ...weatherInfoArray]);
    });
  }

  function createWeatherObj(promises) {
    Promise.all(promises).then((values) => {
      const weatherInfoArray = values.map((res, index) => {
        const getDate = res.daily[index].dt;

        return {
          date: isToday(getDate, index),
          timestamp: getTimestampFuture(index),
          temp_min: res.daily[index].temp.min,
          temp_max: res.daily[index].temp.max,
          weatherDescription: res.current.weather[0].main.toLowerCase(),
        };
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
