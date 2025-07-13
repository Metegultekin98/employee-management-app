import {LitElement, html, css} from 'lit';

export class PaginationControls extends LitElement {
  static properties = {
    totalItems: {type: Number},
    itemsPerPage: {type: Number},
    currentPage: {type: Number},
  };

  constructor() {
    super();
    this.totalItems = 0;
    this.itemsPerPage = 10;
    this.currentPage = 1;
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
  }

  changePage(page) {
    if (page === this.currentPage || page < 1 || page > this.totalPages) return;
    this.dispatchEvent(
      new CustomEvent('page-changed', {
        detail: {page},
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = css`
    .pagination {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-top: 1.5rem;
      flex-wrap: wrap;
    }

    button {
      background: transparent;
      border: none;
      width: 32px;
      height: 32px;
      cursor: pointer;
      border-radius: 9999px;
      transition: all 0.2s ease-in-out;
      font-size: 1rem;
      font-family: 'Poppins', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button.active {
      background: var(--color-primary, #339af0);
      color: white;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .arrows svg path {
      stroke: var(--color-primary) !important;
    }

    .arrows:disabled svg path {
      stroke: var(--color-text-secondary) !important;
    }
  `;

  render() {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const pageButtons = [];

    pageButtons.push(1);

    if (totalPages <= 7) {
      for (let i = 2; i <= totalPages; i++) {
        pageButtons.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 2; i <= 5; i++) {
          pageButtons.push(i);
        }
        pageButtons.push('...');
      } else if (currentPage >= totalPages - 2) {
        pageButtons.push('...');
        for (let i = totalPages - 4; i < totalPages; i++) {
          pageButtons.push(i);
        }
      } else {
        pageButtons.push('...');
        pageButtons.push(currentPage - 1);
        pageButtons.push(currentPage);
        pageButtons.push(currentPage + 1);
        pageButtons.push('...');
      }

      pageButtons.push(totalPages);
    }

    return html`
      <div class="pagination">
        <button
          class="arrows"
          @click=${() => this.changePage(currentPage - 1)}
          ?disabled=${currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        ${pageButtons.map((page) =>
          page === '...'
            ? html`<span style="padding: 0 0.25rem;">...</span>`
            : html`
                <button
                  class=${page === currentPage ? 'active' : ''}
                  @click=${() => this.changePage(page)}
                >
                  ${page}
                </button>
              `
        )}

        <button
          class="arrows"
          @click=${() => this.changePage(currentPage + 1)}
          ?disabled=${currentPage === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            style="transform: rotateY(180deg)"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    `;
  }
}

customElements.define('pagination-controls', PaginationControls);
