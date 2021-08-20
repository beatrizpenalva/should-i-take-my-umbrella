import React from 'react';
import "./style.css";

const WeatherInfo = () => {
    return (
        <section className="week-info">
            <h4>Fri</h4>
            <section className="temp-info">
                <i className="fas fa-wind icon"></i>
                <p>17º C</p>
                <p className="temp-min">14º C</p>
            </section>
        </section>
    )
}

export default WeatherInfo;