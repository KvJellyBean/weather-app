const Footer = (() => {
  // Footer initialize
  function initFooter() {
    const footerTag = document.querySelector('footer');
    footerTag.innerHTML =
      'Made with &hearts; by&nbsp;<a href="https://github.com/KvJellyBean"> KvJellyBean</a>';
  }

  return {
    initFooter
  };
})();

export default Footer;
