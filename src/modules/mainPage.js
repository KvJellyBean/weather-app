import EventHandler from './eventHandler';

const MainPage = (() => {
  function createSection(id) {
    const container = document.createElement('section');
    container.id = id;
    return container;
  }

  function createMainInfo() {
    const container = createSection('mainInfo');
    container.innerHTML = `
        <form id="searchWeather">
            <div class="searchBox"> 
                <div class="unit">
                    <input type="radio" name="unit" id="celsiusRadio" value="Celsius" checked />
                    <label for="celsiusRadio">Celsius</label>  
                    <input type="radio" name="unit" id="fahrenheitRadio" value="Fahrenheit" />
                    <label for="fahrenheitRadio">Fahrenheit</label> 
                </div>

                <input type="text" name="cityName" id="cityNameInput" required /> 
                
                <button type="submit">
                    <span class="material-symbols-outlined"> search </span>
                </button>
            </div>

            <div class="errorMessage">
            <p class="cityError hidden">Please enter valid city.</p>
            <p class="serverError hidden">Can't connect to server, try again.</p>
            </div>
        </form>
        <div id="coreInfo" class="wrapper"></div>
    `;
    return container;
  }

  function createHourlyForecast() {
    const container = createSection('hourlyForecast');
    container.innerHTML = `
      <h3>Hourly Forecast</h3>
      <ul id="hourlyInfo" class="wrapper"></ul>
    `;
    return container;
  }

  function createWeatherCondition() {
    const container = createSection('weatherCondition');
    container.innerHTML = `
      <h3>Current Condition</h3>
      <div id="conditionInfo" class="wrapper"></div>
    `;
    return container;
  }

  function createDailyForecast() {
    const container = createSection('dailyForecast');
    container.innerHTML = `
      <h3>Daily Forecast</h3>
      <ul id="dailyInfo" class="wrapper"></ul>
    `;
    return container;
  }

  // Main page initialize
  function initMain() {
    const mainTag = document.querySelector('main');

    const mainInfo = createMainInfo();
    const hourlyForecast = createHourlyForecast();
    const currentCondition = createWeatherCondition();
    const dailyForecast = createDailyForecast();

    mainTag.append(mainInfo, hourlyForecast, currentCondition, dailyForecast);

    // Add Handler
    EventHandler.mainPage();
  }
  return {
    initMain
  };
})();

export default MainPage;
