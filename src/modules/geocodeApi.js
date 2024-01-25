const API_KEY = '20f7632ffc2c022654e4093c6947b4f4';

const GeoCode = (() => {
  const APILink = 'https://api.openweathermap.org/geo/1.0/direct';

  // Api Fetcher
  async function fetchGeocode(cityName) {
    const response = await fetch(`${APILink}?q=${cityName}&limit=1&appid=${API_KEY}`, {
      mode: 'cors'
    });

    // Check API response/status
    if (!response.ok) throw new Error('Failed to fetch geocode data :(');

    // Get and check for the response to JS Object
    const data = await response.json();
    if (data[0] === undefined)
      throw new Error(`Data unavailable for '${cityName}', changed data to Default`);

    return data[0];
  }

  // Function to get all the geocode data from Geocode API
  async function getGeocodeData(cityName) {
    try {
      const data = await fetchGeocode(cityName);
      return data;
    } catch (error) {
      console.error(error);
      if (error.message === `Data unavailable for '${cityName}', changed data to Default`) {
        // Return default data if Error happen
        const data = await fetchGeocode('London');
        return data;
      }
      throw error;
    }
  }

  // Function to get the latitude of the cityName
  async function getLat(cityName) {
    const data = await getGeocodeData(cityName);
    return data.lat;
  }

  // Function to get the longitude of the cityName
  async function getLon(cityName) {
    const data = await getGeocodeData(cityName);
    return data.lon;
  }

  // Function to get the name of the city based on API
  async function getCity(cityName) {
    const data = await getGeocodeData(cityName);
    return data.name;
  }

  // Function to get the country of the cityName
  async function getCountry(cityName) {
    const data = await getGeocodeData(cityName);
    return data.country;
  }

  return {
    getLat,
    getLon,
    getCity,
    getCountry
  };
})();

export default GeoCode;
