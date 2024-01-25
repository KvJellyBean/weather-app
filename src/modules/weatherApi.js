const API_KEY = '20f7632ffc2c022654e4093c6947b4f4';

const Weather = (() => {
  const APILink = 'https://api.openweathermap.org/data/2.5/onecall';

  async function fetchWeather(lon, lat) {
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
      if (!responseCel.ok && !responseFahr.ok) throw new Error('Cant get the Weather :(');

      const dataCelsius = await responseCel.json();
      const dataFahrenheit = await responseFahr.json();

      return { dataCelsius, dataFahrenheit };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    fetchWeather
  };
})();

export default Weather;
