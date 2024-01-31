import EventHandler from './eventHandler';

const MainPage = (() => {
  /**
   * Create section element
   * @param {string} id - Id to be used as the element id
   * @returns {HTMLElement} - The section with the `id`
   */
  function createSection(id) {
    const container = document.createElement('section');
    container.id = id;
    return container;
  }

  // Function to create Search city form and change the unit
  function createForm() {
    const form = document.createElement('form');
    form.id = 'searchWeather';
    form.innerHTML = `
    <div class="searchBox"> 
      <input type="text" name="cityName" id="cityNameInput" required placeholder="Enter name of the city (e.g. Tokyo)" autocomplete="off"/> 
      
      <button type="submit" aria-label="Search city button">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
      </button>

      <div class="errorMessage">
        <p class="cityError hidden">Please enter valid city.</p>
        <p class="serverError hidden">Can't connect to server, try again.</p>
      </div>

    </div>
    <div class="unit">
      <input type="radio" name="unit" id="celsiusRadio" value="Celsius" checked />
      <label for="celsiusRadio">Celsius</label>  
      <input type="radio" name="unit" id="fahrenheitRadio" value="Fahrenheit" />
      <label for="fahrenheitRadio">Fahrenheit</label> 
    </div>
    `;
    return form;
  }

  // Function to create Hourly Forecast section
  function createHourlyForecast() {
    const container = createSection('hourlyForecast');
    container.innerHTML = `
      <h3>Hourly Forecast</h3>
      <ul id="hourlyInfo"></ul>
    `;
    return container;
  }

  // Function to create Daily Forecast section
  function createDailyForecast() {
    const container = createSection('dailyForecast');
    container.innerHTML = `
      <h3>Daily Forecast</h3>
      <ul id="dailyInfo"></ul>
    `;
    return container;
  }

  // Main page initialize
  function initMain() {
    const mainTag = document.querySelector('main');

    const searchForm = createForm();
    const weatherContent = createSection('weather');
    const forecastContent = createSection('forecast');
    const hourlyForecast = createHourlyForecast();
    const dailyForecast = createDailyForecast();

    weatherContent.classList.add('wrapper');
    forecastContent.classList.add('wrapper', 'hidden');

    forecastContent.append(hourlyForecast, dailyForecast);
    mainTag.append(searchForm, weatherContent, forecastContent);

    // Add Handler
    EventHandler.mainPage();
  }
  return {
    initMain
  };
})();

export default MainPage;
