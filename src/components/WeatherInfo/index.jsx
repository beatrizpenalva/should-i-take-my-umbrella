import React from 'react';
import "./style.css";

const WeatherInfo = ({date, temp_max, temp_min}) => {
    return (
        <section className="week-info">
            <h4>{date}</h4>
            <section className="temp-info">
                <i className="fas fa-wind icon"></i>
                <p>{Math.round(temp_max)} ºC</p>
                <p className="temp-min">{Math.round(temp_min)} ºC</p>
            </section>
        </section>
    )
}

export default WeatherInfo;