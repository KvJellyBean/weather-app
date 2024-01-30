import appLogo from '../images/logo.png';
import EventHandler from './eventHandler';

const Header = (() => {
  // Function to create Logo
  function createLogo() {
    const container = document.createElement('div');
    container.classList.add('logo-container');
    container.innerHTML = `
        <img src=${appLogo} alt="Weathify Logo" />
        <h1>Weathify</h1>
        `;
    return container;
  }

  function createNavigation() {
    const nav = document.createElement('nav');
    nav.classList.add('navbar');
    nav.innerHTML = `
      <ul>
        <li><a href="#weather" class="navLink active">Weather</a></li>
        <li><a href="#forecast" class="navLink">Forecast</a></li>
      </ul>
    `;
    return nav;
  }

  // Header initialize
  function initHeader() {
    const headerTag = document.querySelector('header');
    const logo = createLogo();
    const navbar = createNavigation();
    headerTag.append(logo, navbar);

    // Event Handler
    EventHandler.header();
  }

  return {
    initHeader
  };
})();

export default Header;
