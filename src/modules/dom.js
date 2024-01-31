import { fromUnixTime, format, getHours } from 'date-fns'; // Import from date-fns package module
import { utcToZonedTime } from 'date-fns-tz'; // Import from date-fns-tz package module
import GeoCode from './geocodeApi';
import Weather from './weatherApi';
import LocalStorage from './localStorage';

const DOM = (() => {
  /**
   * Display geocode error message.
   * @param {number} geocodeErrorCode - The geocode error code, where -1 indicates city error and 0 indicates server error.
   */
  function showGeocodeError(geocodeErrorCode) {
    const errorMessage =
      geocodeErrorCode === -1
        ? document.querySelector('.cityError')
        : document.querySelector('.serverError');

    errorMessage.classList.remove('hidden');
    setTimeout(() => {
      errorMessage.classList.add('hidden');
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

    // Load old data and save new data
    LocalStorage.loadData();
    const lastSavedData = LocalStorage.getSavedData();
    lastSavedData.settings.unit = desiredUnit;
    LocalStorage.saveData(lastSavedData);
  }

  // Show weather section
  function showWeatherScreen() {
    const weatherWrapper = document.querySelector('#weather');
    const forecastWrapper = document.querySelector('#forecast');
    weatherWrapper.classList.remove('hidden');
    weatherWrapper.classList.add('showFromLeft');
    forecastWrapper.classList.add('hidden');

    // Clear animation class
    setTimeout(() => {
      weatherWrapper.classList.remove('showFromLeft');
    }, 500);
  }

  // Show forecast section
  function showForecastScreen() {
    const weatherWrapper = document.querySelector('#weather');
    const forecastWrapper = document.querySelector('#forecast');
    forecastWrapper.classList.remove('hidden');
    forecastWrapper.classList.add('showFromRight');
    weatherWrapper.classList.add('hidden');

    // Clear animation class
    setTimeout(() => {
      forecastWrapper.classList.remove('showFromRight');
    }, 500);
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
    // Import all files in image folder (r = required.context folder)
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
   * Get the source path of condition icon from the /images/icon folder based on the condition.
   * @param {string} condition - The weather condition.
   * @returns {string} - The source path of the condition icon.
   */
  function getConditionIcon(condition) {
    // Import all files in icon folder
    const folder = require.context('../images/icon', false, /\.(png|jpe?g|svg)$/);
    const conditionIconFiles = folder.keys().map(folder);

    switch (condition.toLowerCase()) {
      case 'feels like':
        return conditionIconFiles[0];
      case 'humidity':
        return conditionIconFiles[1];
      case 'pressure':
        return conditionIconFiles[2];
      case 'wind speed':
        return conditionIconFiles[4];
      case 'uv index':
        return conditionIconFiles[3];
      default:
        return '';
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
      <div class="icon">
        <img src=${getConditionIcon(condition)}  alt="${condition} icon" />
      </div>
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
      <img src=${getWeatherIcon(data.weather[0].icon)} alt="Icon ${data.weather[0].description} at ${time}" />
      <p>${data.temp.max ? `${Math.round(data.temp.max)}&deg` : Math.round(data.temp)}${data.temp.min ? ` / ${Math.round(data.temp.min)}` : ''}&deg ${unit === 'metric' ? 'C' : 'F'}</p>
      ${hasDesctiption ? `<p>${data.weather[0].description}</p>` : ''}
    `;
    return list;
  }

  /**
   * Check the time, whether it's night or not
   * @param {string} timestamp - Time in unix format.
   * @param {string} timezone - The timezone for the weather data.
   * @returns {string} - The source path of the condition icon.
   */
  function isNight(timestamp, timezone) {
    const currentHour = getHours(getTime(fromUnixTime(+timestamp), timezone));
    return currentHour >= 18 || currentHour <= 6;
  }

  // ==================== RENDER FUNCTIONS ====================
  /**
   * Render the temperature unit based on unit settings on local storage.
   * @param {string} unit - The unit for temperature measurement (metric/imperial).
   */
  function renderUnit(unit) {
    const celsiusRadio = document.querySelector('#celsiusRadio');
    const fahrenheitRadio = document.querySelector('#fahrenheitRadio');

    if (unit === 'metric') {
      celsiusRadio.checked = true;
    } else {
      fahrenheitRadio.checked = true;
    }
  }

  /**
   * Render the main/core information of the weather.
   * @param {object} geocodeData - The geocode data.
   * @param {object} weatherData - The weather data.
   * @param {string} unit - The unit for temperature measurement (metric/imperial).
   */
  function renderMainInfo(geocodeData, weatherData, unit) {
    const mainInfoWrapper = document.querySelector('#weather');
    const celsiusData = weatherData.dataCelsius;
    const fahrenheitData = weatherData.dataFahrenheit;

    mainInfoWrapper.innerHTML = '';
    mainInfoWrapper.innerHTML = `
      <div id="mainContent">
        <img src=${getWeatherIcon(celsiusData.current.weather[0].icon)} alt="${celsiusData.current.weather[0].description}" id="mainImg" class="icon${celsiusData.current.weather[0].icon}"/>
        
        <div id="mainInfo">
          <div class="cityInfo">
            <h2 class="location">${geocodeData.name}, ${geocodeData.country}</h2>    
            <span>
              ${format(
                getTime(fromUnixTime(+celsiusData.current.dt), celsiusData.timezone),
                'EEE hh:mm aa',
                { timeZone: celsiusData.timezone }
              )}
            </span>
          </div>

          <div class="weatherInfo">
            <h2 ${unit === 'metric' ? 'class="celsius"' : 'class="celsius hidden"'}>${Math.round(celsiusData.current.temp)}<sup>&deg C</sup></h2>    
            <h2 ${unit === 'metric' ? 'class="fahrenheit hidden"' : 'class="fahrenheit"'}>${Math.round(fahrenheitData.current.temp)}<sup>&deg F</sup></h2>    
            <p>${celsiusData.current.weather[0].description}</p>
          </div>
        </div>
      </div>

      <div id="sideContent">
          
      </div>
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
    const conditionInfoWrapper = document.querySelector('#sideContent');
    const currentCelsiusData = weatherData.dataCelsius.current;
    const currentFahrenheitData = weatherData.dataFahrenheit.current;

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
      createConditionElement('UV Index', currentCelsiusData.uvi, currentFahrenheitData.uvi, unit)
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
      showLoader();

      // Fetch Geocode data
      const geocodeData = await GeoCode.getGeocode(cityName);
      if (geocodeData === -1 || geocodeData === 0) {
        showGeocodeError(geocodeData);
        return;
      }

      // Save the current data
      LocalStorage.saveData({
        city: {
          cityName,
          lon: geocodeData.lon,
          lat: geocodeData.lat
        },
        settings: {
          unit
        }
      });

      // Fetch Weather data
      const weatherData = await Weather.getWeather(geocodeData.lon, geocodeData.lat);

      renderMainInfo(geocodeData, weatherData, unit);
      renderCurrentCondition(weatherData, unit);
      renderWeatherForecast('hourly', weatherData, unit, false);
      renderWeatherForecast('daily', weatherData, unit, true);

      if (isNight(weatherData.dataCelsius.current.dt, weatherData.dataCelsius.timezone)) {
        document.body.classList.add('night');
      } else {
        document.body.classList.remove('night');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('An error occured: ', error);
    } finally {
      hideLoader();
    }
  }

  return {
    showLoader,
    showUnit,
    showWeatherScreen,
    showForecastScreen,
    renderUnit,
    renderAll
  };
})();

export default DOM;
