import {t as defaultT} from '../../localization/index.js';
import {html, LitElement} from 'lit';
import {mainLayoutStyles} from './main-layout.styles.js';
import '../../components/language-switcher/language-switcher.js';

export class MainLayout extends LitElement {
  static properties = {
    navigation: {type: Object},
    t: {type: Function},
    currentPath: {type: String},
  };

  static styles = mainLayoutStyles;

  constructor() {
    super();
    this.navigation = {};
    this.t = defaultT;
    this.currentPath = window.location.pathname;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadTranslations();

    this._onPopState = () => {
      this.currentPath = window.location.pathname;
    };
    window.addEventListener('popstate', this._onPopState);

    this.langObserver = new MutationObserver(() => this.loadTranslations());
    this.langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._onPopState);
    this.langObserver?.disconnect();
    super.disconnectedCallback();
  }

  async loadTranslations() {
    this.navigation = await this.t('common.mainLayout');
  }

  render() {
    const nav = this.navigation || {};
    const hover = (link) => (this.currentPath === link ? 'opacity: 1;' : '');

    return html`
      <nav>
        <div class="logo">
          <img src="/public/images/ing-logo.png" alt="Logo" />
          <span class="logo-text">ING</span>
        </div>
        <div class="links">
          <a href="/employees" style=${hover('/employees')}>
            <img
              src="/public/icons/employee.png"
              alt="Employees Icon"
              width="24"
              height="24"
            />
            ${nav.employees}
          </a>
          <a href="/employees/add" style=${hover('/employees/add')}>
            <img
              src="/public/icons/add.png"
              alt="Add Icon"
              width="24"
              height="24"
            />
            ${nav.addEmployee}
          </a>
          <language-switcher></language-switcher>
        </div>
      </nav>
      <main>
        <slot></slot>
      </main>
    `;
  }
}

customElements.define('main-layout', MainLayout);
