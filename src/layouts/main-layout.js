import {t as defaultT} from '../localization/index.js';
import {css, html, LitElement} from 'lit';
import '../components/language-switcher/language-switcher.js';

export class MainLayout extends LitElement {
  static properties = {
    navigation: {type: Object},
    t: {type: Function},
  };

  static styles = css`
    nav {
      padding: 0.75rem;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
    }
    main {
      padding: 3.5rem 1rem 1rem 1rem;
      background: var(--color-background);
      min-height: 100vh;
    }
    nav .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    nav .logo img {
      height: 32px;
      border-radius: 4px;
    }
    nav .logo-text {
      font-size: 1rem;
      font-weight: 500;
      color: var(--color-text);
    }
    nav a {
      text-decoration: none;
      color: var(--color-primary);
      font-weight: 500;
      display: flex;
      align-items: center;
      opacity: 0.7;
    }
    nav a:hover {
      opacity: 1;
    }
    nav .links {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  `;

  constructor() {
    super();
    this.navigation = {};
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
    this.navigation = await this.t('common.mainLayout');
  }

  render() {
    const nav = this.navigation || {};
    const current = window.location.pathname;
    const hover = (link) => (current === link ? 'opacity: 1;' : '');
    return html`
      <nav>
        <div class="logo">
          <img src="/public/images/ing-logo.png" alt="Logo" />
          <span class="logo-text">ING</span>
        </div>
        <div class="links">
          <a href="/employees" style="${hover('/employees')}">
            <img
              src="/public/icons/employee.png"
              alt="Employees Icon"
              width="24"
              height="24"
            />
            ${nav.employees}
          </a>
          <a href="/employees/add" style="${hover('/employees/add')}">
            <img
              src="/public/icons/add.png"
              alt="Employees Icon"
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
