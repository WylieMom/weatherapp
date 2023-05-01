import React from "react";
import Spinner from "./Spinner";

const Card = ({ loadingData, showData, weather}) => {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var date = day + "/" + month + "/" + year;

  var url = "";
  var iconUrl = "";

  if (loadingData) {
    return <Spinner />;
  }

  if(showData){
    url = "http://openweathermap.org/img/w/";
    iconUrl = url + weather.weather[0].icon + ".png"

  }

  return (
    <div className="mt-5">
      {showData === true ? (
        
        <div className="container">
          <div className="card mb-3 mx-auto bg-dark text-light">
            <div className="row g-0">
              <div className="col-md-4">

                <h3 className="card-title">{weather.name}</h3>
                <p className="card-date">{date}</p>
                <h1 className="card-temp">{(weather.main.temp.toFixed(1))}˚F</h1>

                <p className="card-desc"><img src={iconUrl} alt="icon"/>{weather.weather[0].description}</p>

                <img
                  src="https://images.unsplash.com/photo-1579020152298-753c903e2fa7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzh8fGRhbGxhc3xlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60"
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body text-start mt-2">
                  <h5 className="card-text">High: {(weather.main.temp_max.toFixed(1))}˚F</h5>
                  <h5 className="card-text">Low: {(weather.main.temp_min.toFixed(1))}˚F</h5>
                  <h5 className="card-text">Feels Like: {(weather.main.feels_like.toFixed(1))}˚F</h5>
                  <h5 className="card-text">Humidity: {weather.main.humidity}%</h5>
                  <h5 className="card-text">Wind: {weather.wind.speed.toFixed(1)}mph</h5>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-light">No Data</h2>
      )}
    </div>
  );
};

export default Card;
