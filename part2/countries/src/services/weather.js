// Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=72a88db804a2596b491c75fa29a869ce
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

export const getWeather = (city) => {
  const request = axios.get(
    `${baseUrl}weather?q=${city}&appid=${apiKey}&units=metric`
  );
  return request.then((response) => response.data);
};

export default { getWeather };
