import React from 'react';
import WeatherInfo from './components/WeatherInfo';
import WeatherDetails from './components/WeatherDetails';

function App() {
  return (
    <>
      <form className="location-info">
        <label>
          What is your location?
          <input type="text" placeholder="Example: Salvador, BR" />
        </label>
      </form>
      
      <i class="fas fa-circle"></i>
      <p>Clear sky</p>

      <section className="weather-info">
        <h1>22º C</h1>

        <section className="tempeture-info">
          <section>
            <p>min</p>
            <h3>18º C</h3>
          </section>

          <section>
            <p>max</p>
            <h3>24º C</h3>
          </section>
        </section>

        <button>More info</button>

        <section className="details-info">
          <WeatherDetails />
          <WeatherDetails />
          <WeatherDetails />
          <WeatherDetails />

        </section>
      </section>
    
      <section className="week-info">
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
    </>
  );
}

export default App;
