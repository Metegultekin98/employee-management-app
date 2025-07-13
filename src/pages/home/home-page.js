import {html, LitElement} from 'lit';
import {t as defaultT} from '../../localization/index.js';
import {router} from '../../main.js';

export class HomePage extends LitElement {
  static properties = {
    translation: {type: Object},
    t: {type: Function},
  };

  constructor() {
    super();
    this.translation = {};
    this.t = defaultT;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadTranslations();

    this.langObserver = new MutationObserver(() => this.loadTranslations());
    this.langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }

  disconnectedCallback() {
    this.langObserver?.disconnect();
    super.disconnectedCallback();
  }

  async loadTranslations() {
    this.translation = await this.t('home-page');
  }

  render() {
    const translate = this.translation || {};
    return html`
      <main
        style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;"
      >
        <div
          style="display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;"
        >
          <div
            style="background-color: white; padding: 1rem; text-align: center"
          >
            <h1 style="color: var(--color-primary); font-weight: 500">
              ${translate.welcomeMessage}
            </h1>
            <button
              @click="${() => router.constructor.go('/employees')}"
              style="
                width: 120px; 
                padding: 0.5rem; 
                border: none; 
                background-color: var(--color-primary); 
                color: white; 
                border-radius: 6px; 
                cursor: pointer;
                font-family: 'Poppins', sans-serif; 
                font-weight: 500;"
            >
              ${translate.goToEmployeeList}
            </button>
          </div>
        </div>
      </main>
    `;
  }
}

customElements.define('home-page', HomePage);
