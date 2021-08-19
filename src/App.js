import React, { useState } from "react";
import WeatherInfo from "./components/WeatherInfo/index";
import WeatherDetails from "./components/WeatherDetails/index";

function App() {
  const [city, setCity] = useState("");

  const callAPI = (e) => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&APPID=7c8b054ddd8f88293b1e0e10e75ba18d`
    )
      .then((response) => response.json())
      .then((res) => console.log(res));
    // .then(json => console.log(json))
  };

  const setCityInput = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <form className="location-info" onSubmit={callAPI}>
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
          <h3>Clear sky</h3>
        </section>

        <section className="info-container">
          <h1>22º C</h1>
          <section className="tempeture-info">
            <section>
              <p>min</p>
              <h3>18ºC</h3>
            </section>

            <section>
              <p>max</p>
              <h3>24ºC</h3>
            </section>
          </section>

          <button className="toggle-button">
            More info<i className="fas fa-chevron-down"></i>
          </button>
          <section className="details-section">
            <WeatherDetails />
            <WeatherDetails />
            <WeatherDetails />
            <WeatherDetails />
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
