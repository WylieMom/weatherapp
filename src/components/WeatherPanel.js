import React, {useState} from 'react';
import Form from './Form';
import Card from './Card';

const WeatherPanel = () => {
    let urlWeather = "https://api.openweathermap.org/data/2.5/weather?appid=0d7c6a5e9ff1afa1d1201838450f6b5d&units=imperial";

    let cityURL = "&q=";

    let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?appid=0d7c6a5e9ff1afa1d1201838450f6b5d&units=imperial";

    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState("");

    const getLocation = async(loc) => {
        setLoading(true);
        setLocation(loc);

        //weather

        urlWeather = urlWeather + cityURL + loc;

        await fetch(urlWeather).then((response) =>{
            if (!response.ok) throw {response}
            return response.json();
        }).then((weatherData) =>{
            console.log(weatherData);
            setWeather(weatherData);
        }).catch(error =>{
            console.log(error);
            setLoading(false);
            setShow(false);
        });

        //Forcast

        urlForecast = urlForecast + cityURL + loc;

        await fetch(urlForecast).then((response) =>{
            if (!response.ok) throw {response}
            return response.json();
        }).then((forecastData) =>{
            console.log(forecastData);
            setForecast(forecastData);

            setLoading(false);
            setShow(true);

        }).catch(error =>{
            console.log(error);
            setLoading(false);
            setShow(false);
        });

    }

    return(
        <React.Fragment>

            <Form 
            newLocation = {getLocation}
            />

            <Card 
            showData = {show}
            loadingData = {loading}
            weather = {weather}
            forecast = {forecast}
            />

        </React.Fragment>
    );
}

export default WeatherPanel;
