import {LitElement, html, css} from 'lit';

export class DataTable extends LitElement {
  static properties = {
    columns: {type: Array},
    rows: {type: Array},
    selectedRows: {type: Array},
    selectable: {type: Boolean},
    multiSelect: {type: Boolean},
  };

  constructor() {
    super();
    this.columns = [];
    this.rows = [];
    this.selectedRows = [];
    this.selectable = false;
    this.multiSelect = false;
  }

  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
    }

    th,
    td {
      padding: 0.75rem;
      text-align: left;
    }

    tr {
      border-top: 1px solid #f6f6f6;
    }

    thead tr {
      border-top: none;
    }

    tbody tr {
      transition: all 0.2s ease-in-out;
    }

    tbody tr:hover {
      cursor: pointer;
      background-color: var(--color-primary-light);
    }

    .large-checkbox {
      height: 18px;
      width: 18px;
      accent-color: var(--color-primary);
      border: 1px solid var(--color-text-secondary);
      border-radius: 6px;
    }
  `;

  isSelected(row) {
    return this.selectedRows.includes(row);
  }

  toggleRow(row) {
    if (!this.selectable) return;

    let updatedSelection;

    if (this.multiSelect) {
      if (this.isSelected(row)) {
        updatedSelection = this.selectedRows.filter((r) => r !== row);
      } else {
        updatedSelection = [...this.selectedRows, row];
      }
    } else {
      updatedSelection = this.isSelected(row) ? [] : [row];
    }

    this.selectedRows = updatedSelection;

    this.dispatchEvent(
      new CustomEvent('selection-changed', {
        detail: {selectedRows: this.selectedRows},
        bubbles: true,
        composed: true,
      })
    );
  }

  toggleSelectAll(e) {
    if (!this.multiSelect) return;

    if (e.target.checked) {
      this.selectedRows = [...this.rows];
    } else {
      this.selectedRows = [];
    }

    this.dispatchEvent(
      new CustomEvent('selection-changed', {
        detail: {selectedRows: this.selectedRows},
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <table>
        <thead>
          <tr>
            ${this.selectable
              ? html`<th
                  style="display: flex; align-items: center; justify-content: center; padding: 1.5rem 0.5rem;"
                >
                  ${this.multiSelect
                    ? html`<input
                        class="large-checkbox"
                        type="checkbox"
                        .checked=${this.selectedRows.length ===
                          this.rows.length && this.rows.length > 0}
                        @change=${this.toggleSelectAll}
                        aria-label="Select all rows"
                      />`
                    : html``}
                </th>`
              : ''}
            ${this.columns.map(
              (col) =>
                html`<th
                  style="color: var(--color-primary); font-weight: 400; font-size: 0.8rem; text-align: center"
                >
                  ${col.label}
                </th>`
            )}
          </tr>
        </thead>
        <tbody>
          ${this.rows.map(
            (row) => html`
              <tr
                class=${this.isSelected(row) ? 'selected' : ''}
                @click=${() => this.toggleRow(row)}
              >
                ${this.selectable
                  ? html`<td
                      @click=${(e) => e.stopPropagation()}
                      style="display: flex; align-items: center; justify-content: center; padding: 1.5rem 0.5rem;"
                    >
                      <input
                        class="large-checkbox"
                        type=${this.multiSelect ? 'checkbox' : 'radio'}
                        name="select-row"
                        .checked=${this.isSelected(row)}
                        @change=${() => this.toggleRow(row)}
                        aria-label="Select row"
                      />
                    </td>`
                  : ''}
                ${this.columns.map(
                  (col) => html`
                    <td
                      style="color: var(--color-text-secondary); font-weight: 300; font-size: 0.8rem; text-align: center"
                    >
                      ${col.render ? col.render(row) : row[col.key]}
                    </td>
                  `
                )}
              </tr>
            `
          )}
        </tbody>
        <tfoot>
          <slot name="footer"></slot>
        </tfoot>
      </table>
    `;
  }
}

customElements.define('data-table', DataTable);
