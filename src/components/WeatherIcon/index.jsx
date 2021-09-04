import React from "react";
import "./style.css";

const WeatherIcon = ({weatherDescription, className}) => {
    const getClass = className+"-icon"
    if(weatherDescription.includes("clouds")) return (<i className={"fas fa-cloud weather-icon" + getClass}></i>)
    if(weatherDescription.includes("rain")) return (<i className={"fas fa-cloud-showers-heavy weather-icon" + getClass}></i>)
    if(weatherDescription.includes("rain")) return (<i className={"fas fa-snowflake weather-icon" + getClass}></i>)
    else return (<i className={"fas fa-circle weather-icon" + className}></i>)
}

export default WeatherIcon;