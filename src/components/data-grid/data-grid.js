import {LitElement, html, css} from 'lit';

export class DataGrid extends LitElement {
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

  static styles = css`
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 8rem;
      row-gap: 3rem;
    }

    .card {
      position: relative;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 1rem;
      background: white;
      cursor: pointer;
      user-select: none;
      box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
      transition: box-shadow 0.2s ease;
      display: flex;
      flex-direction: column;
    }

    .card.selected {
      background-color: var(--color-primary-light);
      border-color: var(--color-primary);
      box-shadow: 0 0 10px #339af0;
    }

    .card:hover {
      box-shadow: 0 4px 8px rgb(0 0 0 / 0.15);
    }

    .card-header {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
    }

    .card-checkbox {
      margin: 0;
      height: 18px;
      width: 18px;
      accent-color: var(--color-primary);
      border: 1px solid var(--color-text-secondary);
      border-radius: 6px;
    }

    .card-field {
      margin-bottom: 0.25rem;
      display: flex;
      flex-direction: column;
    }

    .card-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }

    .card-label {
      font-weight: 300;
      color: var(--color-text-secondary);
    }

    .card-value {
      font-weight: 400;
      color: var(--color-text);
    }
  `;

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
