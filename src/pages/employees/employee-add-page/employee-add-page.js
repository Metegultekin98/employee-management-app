import {connect} from 'pwa-helpers';
import {store} from '../../../store/index.js';
import {html, LitElement} from 'lit';
import {t as defaultT} from '../../../localization/index.js';
import '../../../components/employee-form/employee-form.js';
import {createEmployee} from '../../../store/employees/employeesThunks.js';
import {router} from '../../../main.js';
import {employeeAddPageStyles} from './employee-add-page.styles.js';

export class AddEmployeePage extends connect(store)(LitElement) {
  static properties = {
    employee: {type: Object},
    translation: {type: Object},
    common: {type: Object},
    t: {type: Function},
  };

  static styles = employeeAddPageStyles;

  constructor() {
    super();
    this.employee = {};
    this.translation = {};
    this.common = {};
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
    this.translation = await this.t('employee-add-page');
    this.common = await this.t('common');
  }

  handleSubmit(evt) {
    store.dispatch(
      createEmployee({
        ...evt.detail,
        phone: evt.detail.phone.replace(/\s+/g, ''),
      })
    );
    router.constructor.go('/employees');
  }

  render() {
    const translate = this.translation || {};
    return html`
      <main>
        <h2>${translate.title}</h2>

        <employee-form
          .value=${this.employee}
          @form-submit=${this.handleSubmit}
        ></employee-form>
      </main>
    `;
  }
}

customElements.define('employee-add-page', AddEmployeePage);
