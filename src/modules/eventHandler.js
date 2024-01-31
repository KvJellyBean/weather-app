import DOM from './dom';
import LocalStorage from './localStorage';

const EventHandler = (() => {
  // City name input holder
  let previousCityName = '';

  /**
   * Handle navigation links click
   *  Set active class to the clicked navigation link
   */
  function handleNavigationClick() {
    const nav = document.querySelector('nav ul');
    nav.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.matches('ul') || e.target.matches('li')) return;
      document.querySelectorAll('li .navLink').forEach((link) => {
        link.classList.remove('active');
      });

      if (e.target.matches('li:nth-child(1) .navLink')) {
        e.target.classList.add('active');
        DOM.showWeatherScreen();
      } else if (e.target.matches('li:nth-child(2) .navLink')) {
        e.target.classList.add('active');
        DOM.showForecastScreen();
      }
    });
  }

  // Function for search weather form to get weather informations
  function handleSearchSubmit() {
    const form = document.querySelector('form#searchWeather');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const cityName = document.querySelector('#cityNameInput');
      const unit =
        document.querySelector('input[name="unit"]:checked').value === 'Celsius'
          ? 'metric'
          : 'imperial';

      // Check similiarity of the previous city name and the current input
      if (previousCityName.toLocaleLowerCase() === cityName.value.toLocaleLowerCase()) {
        return;
      }

      DOM.renderAll(cityName.value, unit);
      previousCityName = cityName.value;
      cityName.value = '';
    });
  }

  // Switch unit button handler to change temperature's unit
  function handleSwitchUnitChange() {
    const switchButton = document.querySelector('.unit');
    switchButton.addEventListener('change', (e) => {
      if (e.target.matches('input[type=radio]')) {
        const unit =
          document.querySelector('input[name="unit"]:checked').value === 'Celsius'
            ? 'metric'
            : 'imperial';

        DOM.showUnit(unit);
      }
    });
  }

  // Load storage on page ready/refresh
  function onPageRefresh() {
    if (LocalStorage.isStorageAvailable()) {
      LocalStorage.loadData();
      const cityNames = LocalStorage.getSavedData().city.cityName;
      DOM.renderAll(cityNames, LocalStorage.getSavedData().settings.unit);
    } else {
      DOM.renderAll(previousCityName, 'metric');
    }

    // Set unit based on local storage settings
    DOM.renderUnit(LocalStorage.getSavedData().settings.unit);
  }

  // Header Event Handler
  function header() {
    handleNavigationClick();
  }

  // Main Page Event Handler
  function mainPage() {
    onPageRefresh();
    handleSearchSubmit();
    handleSwitchUnitChange();
  }

  return {
    header,
    mainPage
  };
})();

export default EventHandler;
