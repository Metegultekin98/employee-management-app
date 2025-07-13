import {css} from 'lit';

export const paginationControlsStyles = css`
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
