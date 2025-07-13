import {html, LitElement} from 'lit';
import {t as defaultT} from '../../../localization/index.js';
import {store} from '../../../store/index.js';
import {
  loadEmployeeById,
  modifyEmployee,
} from '../../../store/employees/employeesThunks.js';
import {router} from '../../../main.js';
import {connect} from 'pwa-helpers';
import '../../../components/employee-form/employee-form.js';
import {employeeEditPageStyles} from './employee-edit-page.styles.js';

export class EditEmployeePage extends connect(store)(LitElement) {
  static properties = {
    employee: {type: Object},
    translation: {type: Object},
    common: {type: Object},
    t: {type: Function},
    id: {type: String},
  };

  static styles = employeeEditPageStyles;

  constructor() {
    super();
    this.employee = {};
    this.translation = {};
    this.common = {};
    this.t = defaultT;
    this.id = '';
  }

  onBeforeEnter(location) {
    this.id = location.params.id;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadTranslations();
    store.dispatch(loadEmployeeById(this.id));

    this.langObserver = new MutationObserver(() => this.loadTranslations());
    this.langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }

  stateChanged(state) {
    this.employee = state.employees.employee;
  }

  disconnectedCallback() {
    this.langObserver?.disconnect();
    super.disconnectedCallback();
  }

  async loadTranslations() {
    this.translation = await this.t('employee-edit-page');
    this.common = await this.t('common');
  }

  handleSubmit(evt) {
    store.dispatch(
      modifyEmployee(this.id, {
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

customElements.define('employee-edit-page', EditEmployeePage);
