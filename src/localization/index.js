export const cache = {};
export const basePath = '/public/localization';

/**
 * Set the language of the document and store it in localStorage.
 * @param lang {string} The language code (e.g., 'en', 'tr').
 * @returns {void}
 */
export function setLang(lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent('lang-changed', {detail: lang}));
}

/**
 * Get the current language of the document.
 * @returns {string} The language code (e.g., 'en', 'tr').
 */
export function getCurrentLang() {
  return localStorage.getItem('lang') || document.documentElement.lang || 'en';
}

/**
 * Load a JSON file for localization based on the language and scope.
 * @param lang {string} The language code (e.g., 'en', 'tr').
 * @param scope {string} The scope of the localization (e.g., 'common', 'errors').
 * @returns {Promise<Object>} The parsed JSON object.
 */
export async function loadJsonFile(lang, scope) {
  const key = `${lang}:${scope}`;
  if (cache[key]) return cache[key];

  const url = `${basePath}/${lang}/${scope}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  const json = await res.json();
  cache[key] = json;
  return json;
}

/**
 * Get a nested value from an object using a dot-separated path.
 * @param obj {Object} The object to search.
 * @param path {string} The dot-separated path to the value (e.g., 'errors.notFound').
 * @returns {unknown} The value at the specified path, or undefined if not found.
 */
function getNestedValue(obj, path) {
  if (!path) return obj;
  return path.split('.').reduce((acc, key) => {
    if (acc === undefined) return undefined;
    return acc[key];
  }, obj);
}

/**
 * Translate a path using the current language.
 * @param path {string} The path to translate (e.g., 'common.welcome').
 * @param lang {string} The language code (optional, defaults to the document's language).
 * @returns {Promise<string>} The translated string, or the original path if not found.
 */
export async function t(path, lang = getCurrentLang()) {
  const [scope, ...restPath] = path.split('.');
  const fullKey = restPath.join('.');

  const data = await loadJsonFile(lang, scope);
  return getNestedValue(data, fullKey) ?? `[${path}]`;
}
