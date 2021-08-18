import React from 'react';
import WeatherInfo from './components/WeatherInfo/index';
import WeatherDetails from './components/WeatherDetails/index';

function App() {
  return (
    <>
      <form className="location-info">
        <label>
          What is your location?
          <input type="text" placeholder="Example: Salvador, BR" />
        </label>
      </form>
      
      <section className="container">
        <section className="resume">
          <i class="fas fa-circle"></i>
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

          <button className="toggle-button">More info<i class="fas fa-chevron-down"></i></button>
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
