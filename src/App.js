import React, { useState } from "react";
import "./scss/styles.css";

const mapApi = {
  key: "76e2e40211d26f7ec9952336746346bd",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState([]);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${mapApi.base}weather?q=${query}&units=metric&APPID=${mapApi.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp >= 16
            ? "App warm"
            : "App cold "
          : "App"
      }
    >
      <main>
        <div className="search-box">
          <h1>Weather Forecast</h1>
          <input
            type="text"
            className="search-bar"
            placeholder="Type a city name and press enter."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <p>Please seperate cities and countries with a comma.</p>
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}
                <span>&#176;</span>
              </div>
              <div className="weather-flex">
                <div className="weather">{weather.weather[0].main}</div>
                <img src={`icons/${weather.weather[0].icon}.png`} alt="" />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
