import React from 'react';
import { WeatherIcon } from "../index"
import "./style.css";

const WeatherInfo = ({date, temp_max, temp_min, weatherDescription}) => {
    return (
        <section className="week-info">
            <h4>{date}</h4>
            <section className="temp-info">
                <WeatherIcon weatherDescription={weatherDescription}/>
                <p>{Math.round(temp_max)}</p>
                <p className="temp-min">{Math.round(temp_min)}</p>
            </section>
        </section>
    )
}

export default WeatherInfo;