import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: '',
    humidity: 10,
    speed: 2,
  });
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=46791840e69ba384e2d0e018adf3aaf2&units=metric`;
      axios.get(apiUrl)
        .then(res => {
          console.log(res.data);
          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
          });
          setError('');
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            setError('Invalid City Name');
          } else {
            setError('');
          }
          console.log(err);
        });
    }
  };

  return (
    <div className='container'>
      <div className='weather'>
        <div className='search'>
          <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
          <button><img src='/Images/search.png' onClick={handleClick} alt=""></img></button>
        </div>
        <div className='error'>
          <p>{error}</p>
        </div>
        {data.name && /* Display weather info only if the city name is available */
          <div className='winfo'>
            <img src={data.image} alt="" />
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>
            <div className='details'>
              <div className='col'>
                <div className='humidity'>
                  <p>{Math.round(data.humidity)}%</p>
                  <p>Humidity</p>
                </div>
                <div className='col'>
                  <div className='wind'>
                    <p>{Math.round(data.speed)}km/h</p>
                    <p>Wind</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;
