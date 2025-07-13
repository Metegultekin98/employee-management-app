import {css} from 'lit';

export const dataGridStyles = css`
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 3rem 8rem;
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
    overflow: hidden;
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
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
