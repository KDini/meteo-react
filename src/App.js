import React, { useState } from 'react';
import BackgroundVideo from './BackgroundVideo'
import Brume from './assets/brume.mp4';
import Couvert from './assets/couvert.mp4';
import Degage from './assets/degage.mp4';
import Nuageux from './assets/nuageux.mp4';
import Pluie from './assets/pluie.mp4';


const api = {
  key: "2260379db315c42bc487ba3766872edc",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [description, setDescription] = useState('');

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=fr`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        setDescription(result.weather[0].description);
        //console.log(description)
        //console.log((result.weather[0].description).includes('nuageux'));
      });

    }
  }

  function bgVideoType(des){
    console.log((des).includes('nuageux'));
    console.log(des);

    if ((des).includes('nuageux')) return Nuageux;
    else if ((des).includes('brume')) return Brume;
    else if  ((des).includes('couvert')) return Couvert;
    else if  ((des).includes('déga')) return Degage;
    else if  ((des).includes('pluie')) return Pluie;
  }


  const dateBuilder = (d) => {
    let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main != "undefined") 
        ? ((weather.main.temp > 20) 
          ? 'app warm' 
          : 'app') 
        : 'app'}>

      {(typeof weather.main != "undefined") ? 
        <BackgroundVideo video={bgVideoType(description)}/>: ''}

      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Recherche..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ?  (
        <div>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">
              {dateBuilder(new Date())}
            </div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">
              {weather.weather[0].description}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
