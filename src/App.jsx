import React, { useState, useEffect } from 'react';

import './styles/App.css';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState([]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
    console.log(countryInfo);
  };

  // Fetch all countries
  useEffect(() => {
    const getCountriesData = async () => {
      fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          {/* title + select input dropdown field */}
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* Loop all countries */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* InfoBoxes */}
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={125} total={100000} />
          <InfoBox title="Recovered" cases={1241} total={200} />
          <InfoBox title="Deaths" cases={336} total={100} />
        </div>

        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>

          {/* Graph */}
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
