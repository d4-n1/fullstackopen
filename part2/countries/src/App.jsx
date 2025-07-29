import { useState, useEffect } from 'react';
import Search from './components/search';
import CountryDetail from './components/CountryDetail';
import countryService from './services/countries';
import weatherService from './services/weather';

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [searchCountries, setSearchCountries] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [displayCountries, setDisplayCountries] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    countryService.getCountries().then((response) => setAllCountries(response));
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
      const country = filteredCountries[0].name.common.toLowerCase();
      weatherService
        .getWeather(country)
        .then((response) => setWeatherData(response));
    }
  }, [filteredCountries]);

  const handleFindCountries = (event) => {
    setSearchCountries(event.target.value);

    const search = allCountries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    if (search.length === 0) setDisplayCountries('none');
    else if (search.length === 1) setDisplayCountries('detail');
    else if (search.length <= 10) setDisplayCountries('list');
    else if (search.length > 10) setDisplayCountries('bunch');

    setFilteredCountries(search);
  };

  if (!allCountries) {
    return null;
  }

  const searchCountryByName = (name) => {
    const search = allCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(name);
    });

    setDisplayCountries('detail');
    setFilteredCountries(search);
  };

  const filterCountries = () =>
    searchCountries === '' ? null : renderCountry();

  const renderCountry = () => {
    if (displayCountries === 'detail')
      return <CountryDetail country={selectedCountry} weather={weatherData} />;
    if (displayCountries === 'none') return <div>There's no results</div>;
    if (displayCountries === 'list') {
      return (
        <>
          <ul>
            {filteredCountries.map((country, i) => (
              <li key={i}>
                {country.name.common}{' '}
                <button
                  onClick={() =>
                    searchCountryByName(country.name.common.toLowerCase())
                  }
                >
                  Show
                </button>
              </li>
            ))}
          </ul>
        </>
      );
    }
    if (displayCountries === 'bunch') return <div>Specify another filter</div>;
  };

  return (
    <>
      <Search value={searchCountries} onChange={handleFindCountries} />
      {filterCountries()}
    </>
  );
}

export default App;
