const Weather = (() => {
  const API_KEY = '90fe759deb899e5e74f5f9169fa989de';
  const APILink = 'https://api.openweathermap.org/data/2.5/onecall';

  /**
   * Fetch weather data for a given longitude and latitude from API
   * @param {number} lon - The longitude of the city.
   * @param {number} lat - The latitude of the city.
   * @returns {Promise<{dataCelsius: object, dataFahrenheit: object}>} - An object containing Celsius and Fahrenheit weather data.
   * @throws {Error} - Throws an error if there is an issue fetching the data.
   */
  async function getWeather(lon, lat) {
    try {
      // Fetch weather data in celcius/metric and fahrenheit/imperial unit
      const responseCel = await fetch(
        `${APILink}?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`,
        { mode: 'cors' }
      );
      const responseFahr = await fetch(
        `${APILink}?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=imperial&appid=${API_KEY}`,
        { mode: 'cors' }
      );

      // Check API responses/status
      if (!responseCel.ok) throw new Error('Failed to fetch Celsius weather data :(');
      if (!responseFahr.ok) throw new Error('Failed to fetch Fahrenheit weather data :(');

      // Parse responses to JS Object
      const dataCelsius = await responseCel.json();
      const dataFahrenheit = await responseFahr.json();

      return { dataCelsius, dataFahrenheit };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    getWeather
  };
})();

export default Weather;
