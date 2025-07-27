import { useState, useEffect } from 'react';
import Search from './components/search';
import CountryDetail from './components/CountryDetail';
import countryService from './services/countries';

function App() {
  const [searchCountries, setSearchCountries] = useState('');
  const [allCountries, setAllCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getCountries().then((response) => setAllCountries(response));
  }, []);

  const handleFindCountries = (event) => {
    setSearchCountries(event.target.value);
    setSelectedCountry(null);
    const filter = allCountries.filter((country) => {
      const name = country.name.common.toLowerCase();
      return name.includes(event.target.value.toLowerCase());
    });
    setFilteredCountries(filter);
  };

  if (!allCountries) {
    return null;
  }

  const filterCountries = () =>
    searchCountries === '' ? null : renderCountry(filteredCountries);

  const renderCountry = (search) => {
    // Esto revisa que haya algún país seleccionado
    if (selectedCountry) return <CountryDetail country={selectedCountry} />;

    // Si no hay país seleccionado por el usuario, muestra info en función de lo que se haya escrito en el input search
    if (search.length === 0) return <div>There's no results</div>;
    if (search.length === 1) return <CountryDetail country={search[0]} />;
    if (search.length <= 10) {
      return (
        <>
          <ul>
            {filteredCountries.map((country, i) => (
              <li key={i}>
                {country.name.common}{' '}
                <button onClick={() => setSelectedCountry(country)}>
                  Show
                </button>
              </li>
            ))}
          </ul>
        </>
      );
    }
    if (search.length > 10) return <div>Specify another filter</div>;
  };

  return (
    <>
      <Search value={searchCountries} onChange={handleFindCountries} />
      {filterCountries()}
    </>
  );
}

export default App;
