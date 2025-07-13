import {css, html, LitElement} from 'lit';
import {t as defaultT} from '../../localization/index.js';
import '../../components/data-table/data-table.js';
import '../../components/data-grid/data-grid.js';
import '../../components/pagination-controls/pagination-controls.js';
import '../../components/modal-dialog/modal-dialog.js';
import {
  loadEmployees,
  removeEmployee,
} from '../../store/employees/employeesThunks.js';
import {store} from '../../store/index.js';
import {connect} from 'pwa-helpers';

export class EmployeesPage extends connect(store)(LitElement) {
  static properties = {
    translation: {type: Object},
    common: {type: Object},
    t: {type: Function},
    employees: {type: Array},
    view: {type: String},
    selectedRows: {type: Array},
    currentPage: {type: Number},
    isModalOpen: {type: Boolean},
    activeRow: {type: Object},
    modalMessage: {type: String},
  };

  static styles = css`
    main h2 {
      margin: 1rem 0 1rem 0;
      font-weight: 500;
      color: var(--color-primary);
    }

    .selections {
      display: flex;
      gap: 0.5rem;
    }

    .selections button {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      opacity: 0.5;
      transition: all 0.25s ease-in-out;
    }

    .selections button:hover {
      opacity: 1;
    }
  `;

  constructor() {
    super();
    this.translation = {};
    this.common = {};
    this.t = defaultT;
    this.employees = [];
    this.selectedRows = [];
    this.activeRow = null;
    this.view = 'list';
    this.currentPage = 1;
    this.isModalOpen = false;
    this.modalMessage = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadTranslations();
    store.dispatch(loadEmployees());

    this.langObserver = new MutationObserver(() => this.loadTranslations());
    this.langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }

  stateChanged(state) {
    this.employees = state.employees.employees;
  }

  disconnectedCallback() {
    this.langObserver?.disconnect();
    super.disconnectedCallback();
  }

  async loadTranslations() {
    this.translation = await this.t('employees-page');
    this.common = await this.t('common');
  }

  handleSelectionChanged(event) {
    const selectedRows = event.detail.selectedRows;
    this.selectedRows = selectedRows;
  }

  get rowsPerPage() {
    return this.view === 'grid' ? 4 : 9;
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.employees.slice(start, start + this.rowsPerPage);
  }

  handlePageChange(e) {
    this.currentPage = e.detail.page;
  }

  _onEdit(row) {
    this.dispatchEvent(
      new CustomEvent('edit', {detail: row, bubbles: true, composed: true})
    );
  }

  handleDelete() {
    store.dispatch(removeEmployee(this.activeRow.id));
    this.isModalOpen = false;
  }

  async _onDelete(row) {
    this.activeRow = row;
    this.modalMessage = await this.t(
      'employees-page.modalDialog.confirmDeleteMessage',
      {
        name: row.firstName + ' ' + row.lastName,
      }
    );
    this.isModalOpen = true;
  }

  render() {
    const translate = this.translation || {};
    const columns = [
      {key: 'firstName', label: translate.headers.firstName},
      {key: 'lastName', label: translate.headers.lastName},
      {
        key: 'dateOfEmployment',
        label: translate.headers.dateOfEmployment,
        render: (row) => {
          const date = new Date(row.dateOfEmployment);
          return date.toLocaleDateString(translate.locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        },
      },
      {
        key: 'dateOfBirth',
        label: translate.headers.dateOfBirth,
        render: (row) => {
          const date = new Date(row.dateOfBirth);
          return date.toLocaleDateString(translate.locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        },
      },
      {key: 'phone', label: translate.headers.phone},
      {key: 'email', label: translate.headers.email},
      {key: 'department', label: translate.headers.department},
      {key: 'position', label: translate.headers.position},
      {
        key: 'actions',
        label: translate.headers.actions,
        hideLabel: true,
        render: (row) => html`<div
          style="
          display: flex; 
          gap: 0.5rem; 
          
          ${this.view === 'list' ? 'justify-content: center;' : ''}"
        >
          <button
            style="
            background: transparent;
            border: none; 
            cursor: pointer; 
            padding: 0.25rem;
            display: flex; 
            color: white;
            ${this.view === 'grid' ? 'gap: 0.5rem;' : ''}
            ${this.view === 'grid'
              ? 'background-color: var(--color-secondary) !important;'
              : ''}
            ${this.view === 'grid' ? 'padding: 0.5rem;' : ''}
            border-radius: 6px;
            font-family: 'Poppins', sans-serif;   
            align-items: center;"
            @click=${(e) => {
              e.stopPropagation();
              this._onEdit(row);
            }}
          >
            <img
              src="/public/icons/edit.png"
              width="18"
              height="18"
              alt="Edit Employee"
              style="${this.view === 'grid'
                ? 'filter: brightness(0) invert(1);'
                : ''}"
            />
            <span>${this.view === 'grid' ? this.common.edit : ''}</span>
          </button>
          <button
            style="
            background: transparent; 
            border: none; 
            cursor: pointer; 
            padding: 0.25rem;
            display: flex; 
            color: white;
            ${this.view === 'grid' ? 'gap: 0.5rem;' : ''}
            ${this.view === 'grid'
              ? 'background-color: var(--color-primary) !important;'
              : ''}
            ${this.view === 'grid' ? 'padding: 0.5rem;' : ''}
            border-radius: 6px;
            font-family: 'Poppins', sans-serif;
            align-items: center;"
            @click=${(e) => {
              e.stopPropagation();
              this._onDelete(row);
            }}
          >
            <img
              src="/public/icons/delete.png"
              width="18"
              height="18"
              alt="Delete Employee"
              style="${this.view === 'grid'
                ? 'filter: brightness(0) invert(1);'
                : ''}"
            />
            <span>${this.view === 'grid' ? this.common.delete : ''}</span>
          </button>
        </div>`,
      },
    ];
    return html`
      <main>
        <div
          style="display: flex; justify-content: space-between; align-items: center;"
        >
          <h2>${translate.title}</h2>

          <div class="selections" style="display: flex; gap: 0.5rem;">
            <button
              @click=${() => {
                this.view = 'list';
                this.currentPage = 1;
              }}
              style="${this.view === 'list' ? 'opacity: 1;' : ''}"
            >
              <img
                src="/public/icons/list.png"
                width="24"
                height="24"
                alt="List View"
              />
            </button>
            <button
              @click=${() => {
                this.view = 'grid';
                this.currentPage = 1;
              }}
              style="${this.view === 'grid' ? 'opacity: 1;' : ''}"
            >
              <img
                src="/public/icons/grid.png"
                width="24"
                height="24"
                alt="List View"
              />
            </button>
          </div>
        </div>

        ${this.view === 'list'
          ? html`<data-table
              .columns=${columns}
              .rows=${this.paginatedEmployees}
              .selectedRows=${this.selectedRows}
              selectable
              multiSelect
              @selection-changed=${this.handleSelectionChanged}
            ></data-table>`
          : html`<data-grid
              .columns=${columns}
              .rows=${this.paginatedEmployees}
              .selectedRows=${this.selectedRows}
              selectable
              multiSelect
              @selection-changed=${this.handleSelectionChanged}
            ></data-grid>`}
        <pagination-controls
          .totalItems=${this.employees.length}
          .itemsPerPage=${this.rowsPerPage}
          .currentPage=${this.currentPage}
          @page-changed=${this.handlePageChange}
        ></pagination-controls>
      </main>
      <modal-dialog
        id="delete-modal"
        title="${translate.modalDialog.confirmDelete}"
        ?open=${this.isModalOpen}
        @modal-closed=${() => (this.isModalOpen = false)}
      >
        <p
          style="font-size: 1rem; font-weight: 300; color: var(--color-text-secondary); text-align: center"
        >
          ${this.modalMessage}
        </p>
        <button
          @click=${() => this.handleDelete()}
          style="
          width: 100%; 
          padding: 0.5rem 0; 
          border: none; 
          background-color: var(--color-primary); 
          color: white; 
          border-radius: 6px; 
          cursor: pointer;
          font-family: 'Poppins', sans-serif; 
          font-weight: 500;"
        >
          ${this.common.proceed}
        </button>
        <button
          @click=${() => (this.isModalOpen = false)}
          style="
          width: 100%; 
          padding: 0.4375rem 0; 
          border: 1px solid var(--color-secondary);
          background-color: white; 
          color: var(--color-secondary); 
          border-radius: 6px; 
          cursor: pointer;
          margin-top: 0.5rem;
          font-family: 'Poppins', sans-serif; 
          font-weight: 500;"
        >
          ${this.common.cancel}
        </button>
      </modal-dialog>
    `;
  }
}

customElements.define('employees-page', EmployeesPage);
