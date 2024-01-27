import appLogo from '../images/logo.png';

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

  // Header initialize
  function initHeader() {
    const headerTag = document.querySelector('header');
    const logo = createLogo();
    headerTag.append(logo);
  }

  return {
    initHeader
  };
})();

export default Header;
