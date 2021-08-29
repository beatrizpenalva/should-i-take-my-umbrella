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
  const [show, setShow] = useState(false);

  const setCityInput = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setWeatherData([]);

    getCurrentWeather(city).then((res) => {
      const currentWeather = {
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
      applyColors(currentWeather.description);
    });

    getCordinates(city).then((res) => {
      const cordinatesInfo = {
        latitude: res[0].lat,
        longitude: res[0].lon,
      };

      callHistoricalAPI(cordinatesInfo);
      callForecastAPI(cordinatesInfo);
    });
  };

  const callHistoricalAPI = (cordinatesInfo) => {
    const cordinates = cordinatesInfo;
    const previousDays = 5;
    const promises = [];

    for (let i = 1; i <= previousDays; i++) {
      promises.push(handleMultipleRequestsHistorical(i, cordinates));
    }

    Promise.all(promises).then((values) => {
      const weatherInfoArray = values.map((temp, index) => {
        const sortHourTemp = temp.hourly.sort(function (a, b) {
          return a.temp < b.temp ? -1 : a.temp < b.temp ? 1 : 0;
        });

        const referenceDay = getReferenceDay(index + 1);

        return {
          date: new Date(referenceDay * 1000).toString(),
          temp_min: sortHourTemp[0].temp,
          temp_max: sortHourTemp[23].temp,
          weatherDescription: temp.current.weather[0].main.toLowerCase(),
        };
      });

      setWeatherData(weatherInfoArray);
    });
  };

  function handleMultipleRequestsHistorical(i, cordinates) {
    const referenceDay = getReferenceDay(i);
    return getHistoricalWeather(cordinates, referenceDay);
  }

  function getReferenceDay(i) {
    const todayTimestamp = (+Date.now() / 1000).toFixed(0);
    const dayInSeconds = 24 * 60 * 60;
    return todayTimestamp - dayInSeconds * i;
  }

  const callForecastAPI = (cordinatesInfo) => {
    const cordinates = cordinatesInfo;
    const promises = [];

    for (let i = 0; i <= 6; i++) {
      promises.push(handleMultipleRequestsForecast(cordinates));
    }

    Promise.all(promises).then((values) => {
      const weatherInfoArray = values.map((res, index) => {
        return {
          date: new Date(res.daily[index].dt * 1000).toString(),
          temp_min: res.daily[index].temp.min,
          temp_max: res.daily[index].temp.max,
          weatherDescription: res.current.weather[0].main.toLowerCase(),
        };
      });

      setWeatherData(weatherInfoArray);
    });
  };

  function handleMultipleRequestsForecast(cordinates) {
    return getForecastWeather(cordinates);
  }

  const applyColors = (weatherDescription) => {
    const root = document.documentElement;
    root.style.setProperty("--bg-color", "#FCE19C");
    root.style.setProperty("--font-color", "#312915");
    root.style.setProperty("--icon-color", "#FFC122");

    if (weatherDescription.includes("clouds")) {
      root.style.setProperty("--bg-color", "#D4D9E0");
      root.style.setProperty("--font-color", "#424242");
      root.style.setProperty("--icon-color", "#F0F1F2");
    }

    if (weatherDescription.includes("rain")) {
      root.style.setProperty("--bg-color", "#9CC2FC");
      root.style.setProperty("--font-color", "#283A56");
      root.style.setProperty("--icon-color", "#538FE9");
    }

    if (weatherDescription.includes("snow")) {
      root.style.setProperty("--bg-color", "#D4D9E0");
      root.style.setProperty("--font-color", "424242");
      root.style.setProperty("--icon-color", "#FFFFFF");
    }
  };

  const handleToggle = () => {
    if (show) setShow(false);
    else setShow(true);

    toggleButton();
  };

  const toggleButton = () => {
    const getToggleContainer = document.querySelector(".details-section");
    const getButton = document.querySelector(".toggle-button");
    const getArrow = document.querySelector(".fa-chevron-down");

    if (show) {
      getToggleContainer.classList.add("display");
      getArrow.classList.add("display");
      getButton.innerText = "Less Info";
    } else {
      getToggleContainer.classList.remove("display");
      getArrow.classList.remove("display");
      getButton.innerText = "More Info";
    }
  };

  if (weatherData.length > 0) {
    return (
      <>
        <form className="location-info" onSubmit={handleSubmit}>
          <label>
            What is your location?
            <input
              type="text"
              placeholder="Example: Salvador, BR"
              value={city}
              onChange={setCityInput}
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

            <button onClick={handleToggle}>
              <span className="toggle-button"> More info</span>
              <i className="fas fa-chevron-down"></i>
            </button>

            <section className="details-section">
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
            {weatherData.length > 0 &&
              weatherData.map((item, index) => {
                return (
                  <WeatherInfo
                    key={index}
                    date={item.date.slice(0, 3)}
                    temp_max={item.temp_max}
                    temp_min={item.temp_min}
                    weatherDescription={item.weatherDescription}
                  />
                );
              })}
          </section>
        </section>
      </>
    );
  } else {
    return (
      <main>
        <section className="home-container">
          <h1>Should I take my umbrella?</h1>

          <form className="location-info" onSubmit={handleSubmit}>
            <label>
              {" "}
              What is your location?
              <input
                type="text"
                placeholder="Example: Salvador, BR"
                onChange={setCityInput}
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
