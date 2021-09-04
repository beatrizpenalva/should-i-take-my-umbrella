import React from "react";
// import "./style.css";

const LocationForm = ({ handleSubmit, error, city, handleChange }) => {
  return (
    <form className="location-info" onSubmit={handleSubmit}>
      <label>
        What is your location?
        <input
          type="text"
          placeholder="Example: Salvador, BR"
          required
          value={city}
          onChange={(event) => handleChange(event)}
        />
      </label>

      <p>{error}</p>
    </form>
  );
};

export default LocationForm;
