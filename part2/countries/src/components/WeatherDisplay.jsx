const WeatherDisplay = ({ weather }) => {
  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>Temperature: {weather.main.temp} ºC</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        style={{ width: 80 }}
      ></img>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDisplay;
