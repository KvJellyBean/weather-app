import Header from './modules/header';
import MainPage from './modules/mainPage';
import Footer from './modules/footer';
import './style.css';

function initApp() {
  const bodyTag = document.body;
  const headerTag = document.createElement('header');
  const mainTag = document.createElement('main');
  const footerTag = document.createElement('footer');
  bodyTag.append(headerTag, mainTag, footerTag);
}

function loadDisplay() {
  initApp();
  Header.initHeader();
  MainPage.initMain();
  Footer.initFooter();
}

loadDisplay();
