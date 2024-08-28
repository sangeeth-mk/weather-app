import React, { useRef, useState } from 'react'
import './Weather.css'
import SearchIcon from '../assets/search.png'
import Clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import weather1 from '../assets/weather2.jpg'
// import weather3 from '../assets/weather3.jpg'


import { useEffect } from 'react'




const Weather = () => {

  const inputRef = useRef()

  const [weatherData,setWeatherData] = useState(false)

  const allIcons = {
    "01d":Clear_icon,
    "01n":Clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  }

    const search = async (city)=>{

      if(city === ""){
        alert("enter city name")
        return;
      }

      try {
 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);
        
        if(!response.ok){
          alert(data.message)
          return;
        }

        const icon = allIcons[data.weather[0].icon] || Clear_icon;
        setWeatherData({
          humidity :data.main.humidity, 
          windSpeed :data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon:icon
        })

      } catch (error) {
        setWeatherData(false)
        console.error("error fetching weather data");
        
      }
    }

    useEffect(()=>{
      search("Palakkad")
    },[])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Enter City Name' />
        <img className='icon-search' src={SearchIcon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>

      {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon' />
    <p className='temperature'>{weatherData.temperature}°c</p>
    <p className='location'>{weatherData.location}</p>

    <div className="weather-data">
      <div className="col">
        <img src={humidity_icon} alt="" />
        <div>
          <p>{weatherData.humidity} %</p>
          <span>Humidity</span>
        </div>
      </div>

      <div className="col">
        <img src={wind_icon} alt="" />
        <div>
          <p>{weatherData.windSpeed} km/h</p>
          <span>windSpeed</span>
        </div>
      </div>
    </div>
      </>:
      <>
      <div className='bgclass'>

      </div>
      <img id='img' src={weather1} alt="" style={{height:"300px",width:"300px",marginTop:"20px",borderRadius:"10px"}}/>
      </>
      }

    
    </div>
  )
} 

export default Weather
