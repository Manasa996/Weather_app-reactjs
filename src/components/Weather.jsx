import React from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import { useEffect } from 'react'
import { useState } from 'react'

const Weather = () => {
    const [weatherdata, setWeatherData] = useState({});
    const [city, setCity] = useState('')

    const search = async (city) => {
        if (city === '') {
            return alert('Please enter a city name')
        }
        try {
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

            const res = await fetch(URL);
            const data = await res.json();
            // console.log(data);

            setWeatherData({
                temperature: Math.floor(data.main.temp),
                cityname: data.name,
                humidityCity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: data.weather[0].icon,
                description: data.weather[0].description,
                icontrimmed: data.weather[0].icon.slice(2)
            })



        } catch (error) {
            setWeatherData(false)
            alert("City not found")
        }
    }

    useEffect(() => {
        search('Bengaluru')
    }, [])
    return (
        <div className='weather' style={{ backgroundColor: weatherdata.icontrimmed === 'd' ? '#d9d540' : '#1f2e45', color: weatherdata.icontrimmed === 'd' ? 'black' : 'white' }}>
            <div className="search-bar">
                <input type='text' placeholder='search city' value={city} onChange={(e) => setCity(e.target.value)} />
                <img src={search_icon} alt='search icon' className='searchIcon' onClick={() => search(city)} />
            </div>
            {weatherdata ? <>
                <img src={`https://openweathermap.org/img/wn/${weatherdata.icon}@2x.png`} alt={weatherdata.description} className='weatherImg' />
                <p className='weatherDesc'>{weatherdata.description}</p>
                <p className='weatherTemp'>{weatherdata.temperature} °c</p>
                <p className='weatherCity'>{weatherdata.cityname}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity} alt='Humidity' />
                        <p>{weatherdata.humidityCity} %</p>
                        <p>Humidity</p>
                    </div>
                    <div className="col">
                        <img src={wind} alt='Wind' />
                        <p>{weatherdata.windSpeed} Km/hr</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </> : <></>}

        </div>
    )
}

export default Weather
