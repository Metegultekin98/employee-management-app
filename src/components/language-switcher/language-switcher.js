import {
  getCurrentLang as defaultGetLang,
  setLang as defaultSetLang,
} from '../../localization/index.js';
import {html, LitElement} from 'lit';
import {languageSwitcherStyle} from './language-switcher.styles.js';

export class LanguageSwitcher extends LitElement {
  static properties = {
    lang: {type: String},
  };

  static styles = languageSwitcherStyle;

  #onLangChanged = (e) => {
    this.lang = e.detail;
  };

  constructor() {
    super();
    this.getLang = defaultGetLang;
    this.setLang = defaultSetLang;
    this.lang = this.getLang();
  }

  connectedCallback() {
    super.connectedCallback();
    this.lang = this.getLang();
    window.addEventListener('lang-changed', this.#onLangChanged);
  }

  disconnectedCallback() {
    window.removeEventListener('lang-changed', this.#onLangChanged);
    super.disconnectedCallback();
  }

  toggleLanguage() {
    const langs = ['en', 'tr'];
    const currentIndex = langs.indexOf(this.lang);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    this.setLang(nextLang);
  }

  render() {
    const otherLang = this.lang === 'en' ? 'tr' : 'en';

    return html`
      <button @click=${this.toggleLanguage}>
        <img
          src="/public/icons/flags/${otherLang}.png"
          alt="Switch to ${otherLang}"
          width="24"
          height="16"
        />
      </button>
    `;
  }
}

customElements.define('language-switcher', LanguageSwitcher);
