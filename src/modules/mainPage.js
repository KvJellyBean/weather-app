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
      <input type="text" name="cityName" id="cityNameInput" required placeholder="Enter name of the city (e.g. London)"/> 
      
      <button type="submit">
        <span class="material-symbols-outlined"> search </span>
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
