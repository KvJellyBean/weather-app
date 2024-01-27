import { fromUnixTime, format } from 'date-fns'; // Import from date-fns package module
import { utcToZonedTime } from 'date-fns-tz'; // Import from date-fns-tz package module
import GeoCode from './geocodeApi';
import Weather from './weatherApi';

const DOM = (() => {
  /**
   * Display geocode error message.
   * @param {number} geocodeErrorData - The geocode error data, where -1 indicates city error and 0 indicates server error.
   */
  function showGeocodeError(geocodeErrorData) {
    const messageTemplate =
      geocodeErrorData === -1
        ? document.querySelector('.cityError')
        : document.querySelector('.serverError');
    messageTemplate.classList.remove('hidden');
    setTimeout(() => {
      messageTemplate.classList.add('hidden');
    }, 2000);
  }

  // Show the website loader (loading icon)
  function showLoader() {
    const loader = document.querySelector('.loaderContainer');
    loader.classList.remove('hidden');
  }

  // Hide the website loader (loading icon)
  function hideLoader() {
    const loader = document.querySelector('.loaderContainer');
    loader.classList.add('hidden');
  }

  /**
   * Change the units based on the desired unit.
   * @param {string} desiredUnit - The desired unit for temperature measurement (metric/imperial).
   */
  function showUnit(desiredUnit) {
    const allCelsiusComponents = document.querySelectorAll('.celsius');
    const allFahrenheitComponents = document.querySelectorAll('.fahrenheit');

    allFahrenheitComponents.forEach((component) => {
      component.classList[desiredUnit === 'metric' ? 'add' : 'remove']('hidden');
    });

    allCelsiusComponents.forEach((component) => {
      component.classList[desiredUnit === 'metric' ? 'remove' : 'add']('hidden');
    });
  }

  /**
   * Get time based on the specified timezone.
   * @param {Date} dateTime - The date and time.
   * @param {string} timeZone - The timezone.
   * @returns {Date} - The time in the specified timezone.
   */
  function getTime(dateTime, timeZone) {
    const timeZoneDate = utcToZonedTime(dateTime, timeZone);
    return timeZoneDate;
  }

  /**
   * Get the source path of the weather icon from the /images folder based on the icon ID.
   * @param {string} iconId - The icon ID for the weather.
   * @returns {string} - The source path of the weather icon.
   */
  function getWeatherIcon(iconId) {
    // Import all files in a folder (r = required.context folder)
    const folder = require.context('../images', false, /\.(png|jpe?g|svg)$/);
    const weatherIconFiles = folder.keys().map(folder);

    switch (iconId) {
      case '01d':
        return weatherIconFiles[0];
      case '01n':
        return weatherIconFiles[1];
      case '02d':
        return weatherIconFiles[2];
      case '02n':
        return weatherIconFiles[3];
      case '03d':
      case '03n':
        return weatherIconFiles[4];
      case '04d':
      case '04n':
        return weatherIconFiles[5];
      case '09d':
      case '09n':
        return weatherIconFiles[6];
      case '10d':
        return weatherIconFiles[7];
      case '10n':
        return weatherIconFiles[8];
      case '11d':
      case '11n':
        return weatherIconFiles[9];
      case '13d':
      case '13n':
        return weatherIconFiles[10];
      case '50d':
      case '50n':
        return weatherIconFiles[11];
      default:
        return weatherIconFiles[0];
    }
  }

  /**
   * Create an element for a weather condition.
   * @param {string} condition - The particular condition.
   * @param {number} dataCelsius - The data in metric unit / Celsius.
   * @param {number} dataFahrenheit - The data in imperial unit / Fahrenheit.
   * @param {string} unit - The unit for temperature measurement (metric/imperial).
   * @param {string} metricUnit - The unit of the `condition` in metric.
   * @param {string} imperialUnit - The unit of the `condition` in imperial.
   * @returns {HTMLElement} - The created HTML element.
   */
  function createConditionElement(
    condition,
    dataCelsius,
    dataFahrenheit,
    unit,
    metricUnit = '',
    imperialUnit = ''
  ) {
    const element = document.createElement('div');
    const dataCelsiusDisplay = unit === 'metric' ? '' : 'hidden';
    const dataFahrenheitDisplay = unit === 'metric' ? 'hidden' : '';

    element.classList.add('conditionInfoWrapper');
    element.innerHTML = `
      <p>${condition}</p>
      <p class="celsius ${dataCelsiusDisplay}">${dataCelsius}${metricUnit}</p>
      <p class="fahrenheit ${dataFahrenheitDisplay}">${dataFahrenheit}${imperialUnit}</p>
    `;
    return element;
  }

  /**
   * Create a list element for the weather forecast.
   * @param {string} infoProperty - The type of weather forecast (hourly/daily).
   * @param {object} data - The weather data for the forecast.
   * @param {string} unit - The unit for temperature measurement (metric/imperial).
   * @param {boolean} hasDescription - Flag indicating whether to include weather description.
   * @param {string} timezone - The timezone for the weather data.
   * @returns {HTMLElement} - The created HTML element.
   */
  function createForecastList(infoProperty, data, unit, hasDesctiption, timezone) {
    const list = document.createElement('li');
    const time =
      infoProperty === 'hourly'
        ? format(getTime(fromUnixTime(+data.dt), timezone), 'EEE hh:mm aa', {
            timeZone: timezone
          })
        : format(getTime(fromUnixTime(+data.dt), timezone), 'EEEE', {
            timeZone: timezone
          });

    list.innerHTML = `
      <span>${time}</span>
      <img src=${getWeatherIcon(data.weather[0].icon)} alt="Weather Icon Information" />
      <p>${data.temp.max ? `${Math.round(data.temp.max)}&deg` : Math.round(data.temp)}${data.temp.min ? ` / ${Math.round(data.temp.min)}` : ''}&deg ${unit === 'metric' ? 'C' : 'F'}</p>
      ${hasDesctiption ? `<p>${data.weather[0].description}</p>` : ''}
    `;
    return list;
  }

  // ==================== RENDER FUNCTIONS ====================

  /**
   * Render the main/core information of the weather.
   * @param {object} geocodeData - The geocode data.
   * @param {object} weatherData - The weather data.
   * @param {string} unit - The unit for temperature measurement (metric/imperial).
   */
  function renderCoreInfo(geocodeData, weatherData, unit) {
    const coreInfoWrapper = document.querySelector('#coreInfo');
    const celsiusData = weatherData.dataCelsius;
    const fahrenheitData = weatherData.dataFahrenheit;

    coreInfoWrapper.innerHTML = '';
    coreInfoWrapper.innerHTML = `
      <span>
        ${format(
          getTime(fromUnixTime(+celsiusData.current.dt), celsiusData.timezone),
          'EEE hh:mm aa',
          { timeZone: celsiusData.timezone }
        )}
      </span>
      <h2 class="location">${geocodeData.name}, ${geocodeData.country}</h2>    
      <h2 ${unit === 'metric' ? 'class="celsius"' : 'class="celsius hidden"'}>${Math.round(celsiusData.current.temp)}&deg C</h2>    
      <h2 ${unit === 'metric' ? 'class="fahrenheit hidden"' : 'class="fahrenheit"'}>${Math.round(fahrenheitData.current.temp)}&deg F</h2>    
      <img src=${getWeatherIcon(celsiusData.current.weather[0].icon)} alt="Weather Icon Information" />
      <p>${celsiusData.current.weather[0].description}</p>
    `;
  }

  /**
   * Render the weather forecast section (hourly & daily).
   * @param {string} infoProperty - The type of weather forecast (hourly/daily).
   * @param {object} weatherData - The weather data.
   * @param {string} unit - The unit for temperature measurement (metric/imperial).
   * @param {boolean} hasDescription - Flag indicating whether to include weather description.
   */
  function renderWeatherForecast(infoProperty, weatherData, unit, hasDesctiption = 'false') {
    const infoWrapper = document.querySelector(`#${infoProperty}Info`);
    const celsiusData = weatherData.dataCelsius;
    const fahrenheitData = weatherData.dataFahrenheit;

    infoWrapper.innerHTML = '';

    celsiusData[infoProperty].forEach((data) => {
      const list = createForecastList(
        infoProperty,
        data,
        'metric',
        hasDesctiption,
        celsiusData.timezone
      );
      list.classList.add('celsius');
      list.classList[unit === 'metric' ? 'remove' : 'add']('hidden');
      infoWrapper.append(list);
    });

    fahrenheitData[infoProperty].forEach((data) => {
      const list = createForecastList(
        infoProperty,
        data,
        'imperial',
        hasDesctiption,
        fahrenheitData.timezone
      );
      list.classList.add('fahrenheit');
      list.classList[unit === 'metric' ? 'add' : 'remove']('hidden');
      infoWrapper.append(list);
    });
  }

  /**
   * Render the current condition section.
   * @param {object} weatherData - The weather data.
   * @param {string} unit - The unit for temperature measurement (metric/imperial).
   */
  function renderCurrentCondition(weatherData, unit) {
    const conditionInfoWrapper = document.querySelector('#conditionInfo');
    const currentCelsiusData = weatherData.dataCelsius.current;
    const currentFahrenheitData = weatherData.dataFahrenheit.current;

    conditionInfoWrapper.innerHTML = '';

    // Condition Info
    const conditionElements = [
      createConditionElement(
        'Feels Like',
        currentCelsiusData.feels_like,
        currentFahrenheitData.feels_like,
        unit,
        '&deg C',
        '&deg F'
      ),
      createConditionElement(
        'Humidity',
        currentCelsiusData.humidity,
        currentFahrenheitData.humidity,
        unit,
        '%',
        '%'
      ),
      createConditionElement(
        'Pressure',
        currentCelsiusData.pressure,
        currentFahrenheitData.pressure,
        unit,
        ' hPa',
        ' hPa'
      ),
      createConditionElement(
        'Wind Speed',
        currentCelsiusData.wind_speed,
        currentFahrenheitData.wind_speed,
        unit,
        ' m/s',
        ' mph'
      ),
      createConditionElement('UV Index', currentCelsiusData.uvi, currentFahrenheitData.uvi, unit),
      createConditionElement(
        'Visibility',
        currentCelsiusData.visibility,
        currentFahrenheitData.visibility,
        unit,
        'm',
        'm'
      ),
      createConditionElement(
        'Dew Point',
        currentCelsiusData.dew_point,
        currentFahrenheitData.dew_point,
        unit,
        '&deg C',
        '&deg F'
      ),
      createConditionElement(
        'Cloudiness',
        currentCelsiusData.clouds,
        currentFahrenheitData.clouds,
        unit,
        '%',
        '%'
      )
    ];

    conditionElements.forEach((element) => {
      conditionInfoWrapper.appendChild(element);
    });
  }

  /**
   * Render the entire section's content.
   * @param {string} cityName - The name of the city for weather information.
   * @param {string} unit - The unit for temperature measurement (metric/imperial).
   */
  async function renderAll(cityName, unit = 'metric') {
    try {
      DOM.showLoader();
      const geocodeData = await GeoCode.getGeocode(cityName);
      if (geocodeData === -1 || geocodeData === 0) {
        showGeocodeError(geocodeData);
        return;
      }

      const weatherData = await Weather.getWeather(geocodeData.lon, geocodeData.lat);
      console.log(geocodeData);
      console.log(weatherData.dataCelsius);
      console.log(weatherData.dataFahrenheit);

      renderCoreInfo(geocodeData, weatherData, unit);
      renderWeatherForecast('hourly', weatherData, unit, false);
      renderCurrentCondition(weatherData, unit);
      renderWeatherForecast('daily', weatherData, unit, true);
    } catch (error) {
      console.log('An error occured: ', error);
    } finally {
      hideLoader();
    }
  }

  return {
    showLoader,
    hideLoader,
    showUnit,
    renderAll
  };
})();

export default DOM;
