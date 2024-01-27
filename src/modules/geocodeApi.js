const GeoCode = (() => {
  const API_KEY = '90fe759deb899e5e74f5f9169fa989de';
  const APILink = 'https://api.openweathermap.org/geo/1.0/direct';

  /**
   * Fetch geocode data for a given city name.
   * @param {string} cityName - The name of the city.
   * @returns {Promise<object | number>} - A promise that resolves to geocode data (object) or an error code (number).
   * @throws {Error} - Throws an error if there is an issue fetching the data or if the data is unavailable.
   */
  async function getGeocode(cityName) {
    try {
      // Fetch geocode data
      const response = await fetch(`${APILink}?q=${cityName}&limit=1&appid=${API_KEY}`, {
        mode: 'cors'
      });

      // Check API response/status
      if (!response.ok) throw new Error('Server Error, failed to fetch geocode data.');

      // Parse and check for the response to JS Object
      const data = await response.json();
      if (data[0] === undefined) throw new Error(`Data unavailable for '${cityName}' city.`);

      return data[0];
    } catch (error) {
      console.error(error);

      // Handle specific error case for unavailable data
      if (error.message === `Data unavailable for '${cityName}' city.`) return -1;

      return 0; // Indicate a general error or about fetching error
    }
  }

  return {
    getGeocode
  };
})();

export default GeoCode;
