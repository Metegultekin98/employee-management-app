import {LitElement, html} from 'lit';
import {dataTableStyles} from './data-table.styles.js';

export class DataTable extends LitElement {
  static properties = {
    columns: {type: Array},
    rows: {type: Array},
    selectedRows: {type: Array},
    selectable: {type: Boolean},
    multiSelect: {type: Boolean},
  };

  static styles = dataTableStyles;

  constructor() {
    super();
    this.columns = [];
    this.rows = [];
    this.selectedRows = [];
    this.selectable = false;
    this.multiSelect = false;
  }

  isSelected(row) {
    return this.selectedRows.includes(row);
  }

  _dispatchSelectionChanged() {
    this.dispatchEvent(
      new CustomEvent('selection-changed', {
        detail: {selectedRows: this.selectedRows},
        bubbles: true,
        composed: true,
      })
    );
  }

  toggleRow(row) {
    if (!this.selectable) return;

    if (this.multiSelect) {
      this.selectedRows = this.isSelected(row)
        ? this.selectedRows.filter((r) => r !== row)
        : [...this.selectedRows, row];
    } else {
      this.selectedRows = this.isSelected(row) ? [] : [row];
    }

    this._dispatchSelectionChanged();
  }

  toggleSelectAll(e) {
    if (!this.multiSelect) return;

    this.selectedRows = e.target.checked ? [...this.rows] : [];
    this._dispatchSelectionChanged();
  }

  renderHeader() {
    return html`
      <thead>
        <tr>
          ${this.selectable
            ? html`<th class="select-cell">
                ${this.multiSelect
                  ? html`<input
                      class="large-checkbox"
                      type="checkbox"
                      .checked=${this.selectedRows.length ===
                        this.rows.length && this.rows.length > 0}
                      @change=${this.toggleSelectAll}
                      aria-label="Select all rows"
                    />`
                  : ''}
              </th>`
            : ''}
          ${this.columns.map(
            (col) => html`<th class="column-header">${col.label}</th>`
          )}
        </tr>
      </thead>
    `;
  }

  renderBody() {
    return html`
      <tbody>
        ${this.rows.map(
          (row) => html`
            <tr
              class=${this.isSelected(row) ? 'selected' : ''}
              @click=${() => this.toggleRow(row)}
            >
              ${this.selectable
                ? html`<td
                    class="select-cell"
                    @click=${(e) => e.stopPropagation()}
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
                (col) =>
                  html`<td class="cell-content">
                    ${col.render ? col.render(row) : row[col.key]}
                  </td>`
              )}
            </tr>
          `
        )}
      </tbody>
    `;
  }

  render() {
    return html`
      <div class="table-wrapper">
        <table>
          ${this.renderHeader()} ${this.renderBody()}
          <tfoot>
            <slot name="footer"></slot>
          </tfoot>
        </table>
      </div>
    `;
  }
}

customElements.define('data-table', DataTable);
