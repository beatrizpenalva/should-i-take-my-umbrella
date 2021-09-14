import React from "react";
import { Logo, LocationForm } from "../index";
import "./style.css";

const HomePage = ({ handleSubmit, error, city, handleChange }) => {
  return (
    <main className="default">
      <section className="home-container">
        <h1>Should I take my umbrella?</h1>
        <LocationForm
          handleSubmit={handleSubmit}
          error={error}
          city={city}
          handleChange={handleChange}
        />
      </section>

      <Logo />
    </main>
  );
};

export default HomePage;
