import React, { useState, useEffect } from "react";
import Form from "./Form";
import Card from "./Card";

const WeatherPanel = () => {
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  const getWeatherData = async (location) => {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=0d7c6a5e9ff1afa1d1201838450f6b5d&units=imperial&q=${location}`;
    const response = await fetch(urlWeather);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    setWeather(data);
  };

  const getForecastData = async (location) => {
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=0d7c6a5e9ff1afa1d1201838450f6b5d&units=imperial&q=${location}`;
    const response = await fetch(urlForecast);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    setForecast(data);
  };

  useEffect(() => {
    if (location) {
      setLoading(true);
      Promise.all([getWeatherData(location), getForecastData(location)])
        .then(() => {
          setLoading(false);
          setShow(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setShow(false);
        });
    }
  }, [location]);

  const handleLocationChange = (loc) => {
    setLocation(loc);
  };

  return (
    <>
      <Form newLocation={handleLocationChange} />
      <Card
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
      />
    </>
  );
};

export default WeatherPanel;
