import React from "react";
import "./style.css";

const WeatherDetails = () => {
    return (
        <section className="details-info">
            <i className="fas fa-wind icon"></i>
            <p>3 m/s</p>
            <p className="info">Wind</p>
        </section>
    )
}

export default WeatherDetails;