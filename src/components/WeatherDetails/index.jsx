import React from "react";
import "./style.css";

const WeatherDetails = ({contents, info}) => {
    const typeOfInfo = contents;
    function getIcon(contents) {
        if (typeOfInfo.toLowerCase() === "wind") return (<i className="fas fa-wind icon"></i>)
        if (typeOfInfo.toLowerCase() === "humidity") return (<i className="fas fa-tint icon"></i>)
        if (typeOfInfo.toLowerCase() === "sunrise") return (<i className="far fa-sun icon"></i>)
        if (typeOfInfo.toLowerCase() === "sunset") return (<i className="fas fa-sun icon"></i>)
    }

    return (
        <section className="details-info">
            {getIcon()}
            <p>{info}</p>
            <p className="info">{contents}</p>
        </section>
    )
}

export default WeatherDetails;