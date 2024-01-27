import DOM from './dom';

const EventHandler = (() => {
  let previousCityName = '';

  // Function for search weather form to get weather informations
  function searchWeatherForm() {
    const form = document.querySelector('form#searchWeather');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const cityName = document.querySelector('#cityNameInput').value;
      const unit = document.querySelector('input[name="unit"]:checked').value === 'Celsius' ? 'metric' : 'imperial';
      console.log(cityName, unit);
      if (previousCityName.toLocaleLowerCase() === cityName.toLocaleLowerCase()) {
        return;
      }
      DOM.renderAll(cityName, unit);
      previousCityName = cityName;
    });
  }

  // Function for switch unit button to change temperature's unit
  function switchUnitButton() {
    const switchButton = document.querySelector('form .searchBox .unit');

    switchButton.addEventListener('change', (e) => {
      if (e.target.matches('input[type=radio]')) {
        const unit = document.querySelector('input[name="unit"]:checked').value === 'Celsius' ? 'metric' : 'imperial';
        console.log(unit);
        DOM.showUnit(unit);
      }
    });
  }

  // Main Page Event Handler
  function mainPage() {
    searchWeatherForm();
    switchUnitButton();
  }
  
  return {
    mainPage
  };
})();

export default EventHandler;
