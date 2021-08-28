import React from 'react';
import "./style.css";

const WeatherInfo = () => {
    return (
        <main className="home-container">
            <h1>Should I take my umbrella?</h1>
             <form className="location-info">
                <label> What is your location?
                <input
                    type="text"
                    placeholder="Example: Salvador, BR"
                />
                </label>
            </form>

            <section className="logo">
                <div className="umbrella-1"></div>

                <div className="umbrella"></div>
                
                <div className="umbrella-bottom">
                    <div className="umbrella-2"></div>
                    <div className="umbrella-3"></div>
                </div>
            </section>
        </main>
    )
}

//onSubmit={getCurrentWeather} 
//onChange={setCityInput}

export default WeatherInfo;