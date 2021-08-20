import React from "react";
import "./style.css";

const WeatherDetails = ({contents, info}) => {
    return (
        <section className="details-info">
            <i className="fas fa-wind icon"></i>
            <p>{info}</p>
            <p className="info">{contents}</p>
        </section>
    )
}

export default WeatherDetails;