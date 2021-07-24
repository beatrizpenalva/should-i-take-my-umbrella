import React from 'react';
import WeatherInfo from './components/WeatherInfo';

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
        <li className="info">
          <p><i class="fas fa-wind"></i></p>
          <p>3m/s</p>
          <p>Wind</p>
        </li>

        <li className="info">
          <p><i class="fas fa-wind"></i></p>
          <p>3m/s</p>
          <p>Humidity</p>
        </li>

        <li className="info">
          <p><i class="fas fa-wind"></i></p>
          <p>3m/s</p>
          <p>Pressure</p>
        </li>

        <li className="info">
          <p><i class="far fa-sun"></i></p>
          <p>3m/s</p>
          <p>Sunrise</p>
        </li>

        <li className="info">
          <p><i class="far fa-sun"></i></p>
          <p>3m/s</p>
          <p>Sunset</p>
        </li>
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
