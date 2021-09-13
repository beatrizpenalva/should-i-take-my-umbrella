import React from "react";
import "./style.css";

const WeatherDetails = ({contents, info}) => {
    function getClass() {
        const typeOfInfo = contents.toLowerCase();

        if (typeOfInfo === "wind") return "fas fa-wind icon"
        else if (typeOfInfo === "humidity") return "fas fa-tint icon"
        else if (typeOfInfo === "sunrise") return "far fa-sun icon"
        else if (typeOfInfo === "sunset") return  "fas fa-sun icon"
    }

    // function get() {
    //     const typeOfInfo = contents.toLowerCase();
    //     if (typeOfInfo === "wind") return "m/s"
    //     else (typeOfInfo === "humidity") return "%"
    // }

    return (
        <section className="details-info">
            <i className={getClass()}></i>
            <p>{info}</p>
            <p className="info">{contents}</p>
        </section>
    )
}

export default WeatherDetails;