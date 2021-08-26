import React from "react";
// import "./style.css";

const WeatherIcon = ({weatherDescription}) => {
    if(weatherDescription.includes("clouds")) {
        return (<i class="fas fa-cloud resume"></i>)
    }
    if (weatherDescription.includes("rain")) {
        return (<i class="fas fa-cloud-showers-heavy resume"></i>)
    }
    if (weatherDescription.includes("snow")) {
        return (<i class="fas fa-snowflake resume"></i>)
    }
    else {
        return(<i className="fas fa-circle resume"></i>)
    }
}

export default WeatherIcon;