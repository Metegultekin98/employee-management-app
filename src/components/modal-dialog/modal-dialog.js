import {LitElement, html} from 'lit';
import {modalDialogStyles} from './modal-dialog.styles.js';

export class ModalDialog extends LitElement {
  static properties = {
    open: {type: Boolean, reflect: true},
    title: {type: String},
  };

  static styles = modalDialogStyles;

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _handleKeydown(e) {
    if (this.open && e.key === 'Escape') {
      this.close();
    }
  }

  close() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('modal-closed', {bubbles: true, composed: true})
    );
  }

  _onBackdropClick(e) {
    if (e.target === this.shadowRoot.querySelector('.backdrop')) {
      this.close();
    }
  }

  render() {
    return html`
      <div class="backdrop" @click=${this._onBackdropClick} part="backdrop">
        <section
          class="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabindex="-1"
        >
          <header>
            <span id="modal-title">${this.title}</span>
            <button
              class="close-button"
              aria-label="Close modal"
              @click=${this.close}
            >
              &times;
            </button>
          </header>
          <slot></slot>
        </section>
      </div>
    `;
  }
}

customElements.define('modal-dialog', ModalDialog);
