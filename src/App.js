import React, { useState } from "react";
import WeatherInfo from "./components/WeatherInfo/index";
import WeatherDetails from "./components/WeatherDetails/index";

function App() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [weatherData, setWeatherData] = useState([]);
  const [show, setShow] = useState(false);
  //informações sobre o sol (nascer e se por)

  const getCurrentWeather = (event) => {
    event.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&units=metric&APPID=7c8b054ddd8f88293b1e0e10e75ba18d`
    )
      .then((response) => response.json())
      .then((res) => {
        const currentWeather = {
          description: res.weather[0].description,
          icon: res.weather[0].icon,
          temp: res.main.temp,
          temp_max: res.main.temp_max,
          temp_min: res.main.temp_min,
          humidity: res.main.humidity,
          pressure: res.main.pressure,
          wind: res.wind.speed,
        };

        setCurrentWeather(currentWeather);
        getCordinates(city);
      });
  };

  const getCordinates = (location) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=7c8b054ddd8f88293b1e0e10e75ba18d`
    )
      .then((response) => response.json())
      .then((res) => {
        getForecastWeather(res[0].lat, res[0].lon);
        getHistoricalWeather(res[0].lat, res[0].lon);
      });
  };

  const getHistoricalWeather = (lat, lon) => {
    const todayTimestamp = (+Date.now() / 1000).toFixed(0);
    const dayInSeconds = 24 * 60 * 60;
    const previousDays = 5;

    for (let i = 1; i <= previousDays; i++) {
      let referenceDay = todayTimestamp - dayInSeconds * i;

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${referenceDay}&units=metric&appid=7c8b054ddd8f88293b1e0e10e75ba18d`
      )
        .then((response) => response.json())
        .then((res) => {
          
          const sortHourTemp = res.hourly.sort(function (a, b) {
            return a.temp < b.temp ? -1 : a.temp < b.temp ? 1 : 0;
          });

          const weatherInfo = {
            date: (new Date(referenceDay * 1000)).toString(),
            temp_min: sortHourTemp[0].temp,
            temp_max: sortHourTemp[23].temp
          }

          setWeatherData(prevState => ([...prevState, weatherInfo]))
        });
    }
  };

  const getForecastWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=7c8b054ddd8f88293b1e0e10e75ba18d`
    )
      .then((response) => response.json())
      .then((res) => {
        for (let i = 0; i <= 7; i++) {

          let weatherInfo = {
            date: (new Date((res.daily[i].dt) * 1000)).toString(),
            temp_min: res.daily[i].temp.min,
            temp_max: res.daily[i].temp.max
          }

          setWeatherData(prevState => ([...prevState, weatherInfo]))
        }
      });
  };

  const handleToggle = () => {
    if(show) setShow(false)
    else setShow(true)

    toggleButton();
  }

  const toggleButton = () => {
    const getToggleContainer = document.querySelector(".details-section")
    const getButton = document.querySelector(".toggle-button");
    const getArrow = document.querySelector(".fa-chevron-down")

    if (show) {
      getToggleContainer.classList.add("display");
      getArrow.classList.add("display");
      getButton.innerText = "Less Info"
    }  

    else {
      getToggleContainer.classList.remove("display");
      getArrow.classList.remove("display");
      getButton.innerText = "More Info"
    }
  }

  const setCityInput = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <form className="location-info" onSubmit={getCurrentWeather}>
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
          <h3>{currentWeather.description}</h3>
        </section>

        <section className="info-container">
          <h1>{Math.round(currentWeather.temp)} ºC</h1>

          <section className="tempeture-info">
            <section>
              <p>min</p>
              <h3>{Math.round(currentWeather.temp_min)} ºC</h3>
            </section>

            <section>
              <p>max</p>
              <h3>{Math.round(currentWeather.temp_max)} ºC</h3>
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
              contents={"Pressure"}
              info={currentWeather.pressure + "hPa"}
            />

            <WeatherDetails
              contents={"Wind"}
              info={currentWeather.wind + "m/s"}
            />
          </section>
        </section>

        <section className="week-section">
          {weatherData.length > 0 && weatherData.map((item, index) => {
            return <WeatherInfo 
              key={index} 
              date={item.date.slice(0,3)} 
              temp_max={item.temp_max} 
              temp_min={item.temp_min} />
            })
          }
        </section>
      </section>
    </>
  );
}

export default App;
