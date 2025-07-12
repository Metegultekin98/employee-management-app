import {
  getCurrentLang as defaultGetLang,
  setLang as defaultSetLang,
} from '../../localization/index.js';
import {css, html, LitElement} from 'lit';

export class LanguageSwitcher extends LitElement {
  static properties = {
    lang: {type: String},
    getLang: {type: Function},
    setLang: {type: Function},
  };

  static styles = css`
    button {
      border: none;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  constructor() {
    super();
    this.getLang = defaultGetLang;
    this.setLang = defaultSetLang;
    this.lang = this.getLang();
  }

  connectedCallback() {
    super.connectedCallback();
    this.lang = this.getLang();
    window.addEventListener('lang-changed', this._onLangChanged);
  }

  disconnectedCallback() {
    window.removeEventListener('lang-changed', this._onLangChanged);
    super.disconnectedCallback();
  }

  _onLangChanged = (e) => {
    this.lang = e.detail;
  };

  toggleLanguage() {
    const newLang = this.lang === 'en' ? 'tr' : 'en';
    this.setLang(newLang);
  }

  render() {
    return html`
      <button @click=${this.toggleLanguage}>
        <img
          src="/public/icons/flags/${this.lang === 'en' ? 'tr' : 'en'}.png"
          alt="Language Icon"
          width="24"
          height="16"
        />
      </button>
    `;
  }
}

customElements.define('language-switcher', LanguageSwitcher);
