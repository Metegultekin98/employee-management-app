const STORAGE_KEY = 'employeeAppState';

/**
 * Loads the application state from localStorage.
 * @returns {undefined|Object} The loaded state or undefined if not found.
 */
export function loadState() {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : undefined;
  } catch (e) {
    console.error('Failed to load state from localStorage:', e);
    return undefined;
  }
}

/**
 * Saves the application state to localStorage.
 * @param state {Object} The state to save.
 * * @returns {void}
 */
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage:', e);
  }
}
