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

/*
    <i class="fas fa-tint"></i>
    <i className="fas fa-wind icon"></i>
    <i class="fas fa-sun"></i>
    <i class="far fa-sun"></i>
*/

export default WeatherDetails;