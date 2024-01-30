const LocalStorage = (() => {
  // Local storage key and variable to hold saved data
  const STORAGE_KEY = 'Weathify_userData';
  let savedData = {};

  // Check browser support for local storage
  function isStorageAvailable() {
    // eslint-disable-next-line valid-typeof
    if (typeof localStorage === undefined) {
      return false;
    }
    return true;
  }

  /**
   * Save data to local storage
   * @param {Object} data - The data object containing city (name, lon,lat) and unit settings
   */
  function saveData(data) {
    if (isStorageAvailable()) {
      const dataJSON = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, dataJSON);
    }
  }

  // Load data from local storage
  function loadData() {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(data);

    if (parsedData !== null) {
      savedData = parsedData;
    } else {
      savedData = {
        city: {
          cityName: 'Tokyo',
          lon: 139.7594549,
          lat: 35.6828387
        },
        settings: {
          unit: 'metric'
        }
      };

      saveData(savedData);
    }
  }

  // Take the savedData value
  function getSavedData() {
    return savedData;
  }

  return {
    isStorageAvailable,
    loadData,
    saveData,
    getSavedData
  };
})();

export default LocalStorage;
