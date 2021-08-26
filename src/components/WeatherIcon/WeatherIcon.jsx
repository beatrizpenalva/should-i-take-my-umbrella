import React from "react";
import "./index.css";

const WeatherIcon = ({weatherDescription}) => {
    if(weatherDescription) {
        if(weatherDescription.includes("clouds")) {
            return (<i className="fas fa-cloud weather-icon"></i>)
        }
        if (weatherDescription.includes("rain")) {
            return (<i className="fas fa-cloud-showers-heavy weather-icon"></i>)
        }
        if (weatherDescription.includes("snow")) {
            return (<i className="fas fa-snowflake weather-icon"></i>)
        }
        else {
            return(<i className="fas fa-circle weather-icon"></i>)
        }
    }
    else {
        return(<i className="fas fa-circle weather-icon"></i>)
    }
}

export default WeatherIcon;