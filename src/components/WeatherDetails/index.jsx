import React from "react";
import "./style.css";

const WeatherDetails = ({ contents, info }) => {
  const typeOfInfo = contents.toLowerCase();

  function getClass() {
    if (typeOfInfo === "wind") return "fas fa-wind icon";
    else if (typeOfInfo === "humidity") return "fas fa-tint icon";
    else if (typeOfInfo === "sunrise") return "far fa-sun icon";
    else if (typeOfInfo === "sunset") return "fas fa-sun icon";
  }

  function getUnits() {
    if (typeOfInfo === "wind") return `${info}m/s`;
    else if (typeOfInfo === "humidity") return `${info}%`;
    else return info;
  }

  return (
    <section className="details-info">
      <i className={getClass()}></i>
      <p>{getUnits()}</p>
      <p className="info">{contents}</p>
    </section>
  );
};

export default WeatherDetails;
