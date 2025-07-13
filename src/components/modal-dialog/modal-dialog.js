import {LitElement, html, css} from 'lit';

export class ModalDialog extends LitElement {
  static properties = {
    open: {type: Boolean, reflect: true},
    title: {type: String},
  };

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

  static styles = css`
    :host {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 1000;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.4);
      animation: fadeOut 0.3s forwards;
    }

    :host([open]) {
      display: flex;
      animation: fadeIn 0.3s forwards;
    }

    .modal {
      background: white;
      border-radius: 8px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow: auto;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      position: relative;
      padding: 1.5rem 1.5rem 2rem 1.5rem;
      box-sizing: border-box;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    button.close-button {
      background: none;
      border: none;
      font-size: 2.5rem;
      cursor: pointer;
      line-height: 1;
      padding: 0;
      opacity: 0.7;
      color: var(--color-primary);
      transition: opacity 0.2s ease;
    }

    #modal-title {
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--color-primary);
    }

    button.close-button:hover {
      opacity: 1;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;

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
