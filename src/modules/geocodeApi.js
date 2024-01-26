const GeoCode = (() => {
  const API_KEY = '90fe759deb899e5e74f5f9169fa989de';
  const APILink = 'https://api.openweathermap.org/geo/1.0/direct';

  // Function to get all the geocode data from Geocode API
  async function getGeocode(cityName) {
    try {
      const response = await fetch(`${APILink}?q=${cityName}&limit=1&appid=${API_KEY}`, {
        mode: 'cors'
      });

      // Check API response/status
      if (!response.ok) throw new Error('Server Error, failed to fetch geocode data.');

      // Get and check for the response to JS Object
      const data = await response.json();
      if (data[0] === undefined) throw new Error(`Data unavailable for '${cityName}' city.`);

      return data[0];
    } catch (error) {
      console.error(error);
      if (error.message === `Data unavailable for '${cityName}' city.`) {
        return -1;
      }
      return 0;
    }
  }

  return {
    getGeocode
  };
})();

export default GeoCode;
