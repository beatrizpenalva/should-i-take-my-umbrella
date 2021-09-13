import React from "react";
import "./style.css";

const WeatherIcon = ({ weatherDescription }) => {
  function getIconName() {
    if (weatherDescription.includes("clouds")) return "cloud";
    if (weatherDescription.includes("rain")) return "cloud-showers-heavy";
    if (weatherDescription.includes("snow")) return "snowflake";
    else return "circle";
  }

  return <i className={`fas fa-${getIconName()} ${getIconName()}-icon`}></i>;
};

export default WeatherIcon;
