const Weather = (() => {
  const API_KEY = '90fe759deb899e5e74f5f9169fa989de';
  const APILink = 'https://api.openweathermap.org/data/2.5/onecall';

  // Function to get all the geocode data from Geocode API
  async function getWeather(lon, lat) {
    try {
      const cityLon = await lon;
      const cityLat = await lat;

      const responseCel = await fetch(
        `${APILink}?lat=${cityLat}&lon=${cityLon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`,
        { mode: 'cors' }
      );
      const responseFahr = await fetch(
        `${APILink}?lat=${cityLat}&lon=${cityLon}&exclude=minutely,alerts&units=imperial&appid=${API_KEY}`,
        { mode: 'cors' }
      );

      // Check API responses/status
      if (!responseCel.ok) throw new Error('Failed to fetch Celsius weather data :(');
      if (!responseFahr.ok) throw new Error('Failed to fetch Fahrenheit weather data :(');

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
