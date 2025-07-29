import WeatherDisplay from './WeatherDisplay';

const CountryDetail = ({ country, weather }) => {
  const renderLanguages = () => {
    return Object.values(country.languages).map((lang, i) => (
      <li key={i}>{lang}</li>
    ));
  };

  if (!country) {
    return null;
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>{renderLanguages()}</ul>
      <img
        src={country.flags.svg}
        alt={country.flags.alt}
        style={{ width: 120 }}
      ></img>

      <WeatherDisplay weather={weather} />
    </div>
  );
};

export default CountryDetail;
