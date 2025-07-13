import {LitElement, html} from 'lit';
import {t as defaultT} from '../../localization/index.js';
import {employeeFormStyles} from './employee-form.styles.js';
import {validateEmployeeForm} from '../../utils/validate.js';
import {formatPhone} from '../../utils/formatPhone.js';

export class EmployeeForm extends LitElement {
  static get properties() {
    return {
      value: {type: Object},
      translation: {type: Object},
      common: {type: Object},
      t: {type: Function},
    };
  }

  static styles = employeeFormStyles;

  constructor() {
    super();
    this.value = {};
    this._errors = {};
    this._positions = ['Junior', 'Medior', 'Senior'];
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

  validate(formData) {
    const errors = validateEmployeeForm(formData, this.translation);

    this._errors = errors;
    this.requestUpdate();
    return Object.keys(errors).length === 0;
  }

  handlePhoneInput = (e) => {
    e.target.value = formatPhone(e.target.value);
  };

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = Object.fromEntries(new FormData(form).entries());

    if (this.validate(formData)) {
      this.dispatchEvent(
        new CustomEvent('form-submit', {
          detail: formData,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    const v = {...this.value};
    if (v.phone) {
      v.phone = formatPhone(v.phone);
    }
    const translation = this.translation || {};
    return html`
      <div style="padding: 4rem; background-color: white;">
        <form @submit=${this.handleSubmit.bind(this)} novalidate>
          <div class="form">
            ${this.renderInput(
              'firstName',
              translation.inputs.firstName,
              v.firstName
            )}
            ${this.renderInput(
              'lastName',
              translation.inputs.lastName,
              v.lastName
            )}
            ${this.renderInput(
              'dateOfEmployment',
              translation.inputs.dateOfEmployment,
              v.dateOfEmployment,
              'date'
            )}
            ${this.renderInput(
              'dateOfBirth',
              translation.inputs.dateOfBirth,
              v.dateOfBirth,
              'date'
            )}
            ${this.renderInput(
              'phone',
              translation.inputs.phone,
              v.phone,
              'tel'
            )}
            ${this.renderInput(
              'email',
              translation.inputs.email,
              v.email,
              'email'
            )}
            ${this.renderInput(
              'department',
              translation.inputs.department,
              v.department
            )}

            <label>
              ${translation.inputs.position}
              <select name="position" style="margin-top: 0.5rem;">
                <option value="">${translation.form.pleaseSelect}</option>
                ${this._positions.map(
                  (p) =>
                    html`<option value=${p} ?selected=${v.position === p}>
                      ${p}
                    </option>`
                )}
              </select>
              ${this._errors.position
                ? html`<span class="error">${this._errors.position}</span>`
                : ''}
            </label>
          </div>

          <div
            style="margin-top: 4rem; display: flex; justify-content: center; align-items: center; gap: 2rem;"
          >
            <button
              type="submit"
              style="
                width: 360px; 
                padding: 0.5rem 0; 
                border: none; 
                background-color: var(--color-primary); 
                color: white; 
                border-radius: 6px; 
                cursor: pointer;
                font-family: 'Poppins', sans-serif; 
                font-weight: 500;"
            >
              ${this.common.submit}
            </button>

            <button
              @click=${() => window.history.back()}
              style="
                width: 360px; 
                padding: 0.4375rem 0; 
                border: 1px solid var(--color-secondary);
                background-color: white; 
                color: var(--color-secondary); 
                border-radius: 6px; 
                cursor: pointer;
                font-family: 'Poppins', sans-serif; 
                font-weight: 500;"
            >
              ${this.common.cancel}
            </button>
          </div>
        </form>
      </div>
    `;
  }

  renderInput(name, label, value = '', type = 'text') {
    const isPhone = name === 'phone';
    return html`
      <label>
        ${label}
        <input
          type=${type}
          name=${name}
          .value=${value ?? ''}
          style="margin-top: 0.5rem;"
          maxlength="14"
          @input=${isPhone ? this.handlePhoneInput : null}
        />
        ${this._errors[name]
          ? html`<span class="error">${this._errors[name]}</span>`
          : ''}
      </label>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
