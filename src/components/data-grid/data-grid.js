import {LitElement, html} from 'lit';
import {dataGridStyles} from './data-grid.styles.js';

export class DataGrid extends LitElement {
  static properties = {
    columns: {type: Array},
    rows: {type: Array},
    selectedRows: {type: Array},
    selectable: {type: Boolean},
    multiSelect: {type: Boolean},
  };

  static styles = dataGridStyles;

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

  toggleRow(row) {
    if (!this.selectable) return;

    let updatedSelection;

    if (this.multiSelect) {
      updatedSelection = this.isSelected(row)
        ? this.selectedRows.filter((r) => r !== row)
        : [...this.selectedRows, row];
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

  render() {
    return html`
      <div class="grid">
        ${this.rows.map(
          (row) => html`
            <div
              class="card ${this.isSelected(row) ? 'selected' : ''}"
              @click=${() => this.toggleRow(row)}
            >
              ${this.selectable
                ? html`
                    <label
                      class="card-header"
                      @click=${(e) => e.stopPropagation()}
                    >
                      <input
                        type=${this.multiSelect ? 'checkbox' : 'radio'}
                        name="select-row"
                        class="card-checkbox"
                        .checked=${this.isSelected(row)}
                        @change=${() => this.toggleRow(row)}
                        aria-label="Select row"
                      />
                    </label>
                  `
                : ''}
              <div class="card-content">
                ${this.columns.map(
                  (col) => html`
                    <div class="card-field">
                      ${col.hideLabel
                        ? ''
                        : html`<span class="card-label">${col.label}:</span>`}
                      ${col.render
                        ? col.render(row)
                        : html`<span class="card-value">${row[col.key]}</span>`}
                    </div>
                  `
                )}
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('data-grid', DataGrid);
