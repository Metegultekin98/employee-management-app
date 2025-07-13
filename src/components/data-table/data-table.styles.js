import {css} from 'lit';

export const dataTableStyles = css`
  .table-wrapper {
    overflow-x: auto;
    width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    min-width: 600px;
  }

  th,
  td {
    padding: 0.75rem;
    text-align: center;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  .table-wrapper::-webkit-scrollbar {
    height: 6px;
  }

  .table-wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  th {
    color: var(--color-primary);
    font-weight: 400;
  }

  td {
    color: var(--color-text-secondary);
    font-weight: 300;
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

  tr.selected {
    background-color: var(--color-primary-light);
  }

  .large-checkbox {
    height: 18px;
    width: 18px;
    accent-color: var(--color-primary);
    border: 1px solid var(--color-text-secondary);
    border-radius: 6px;
  }

  .select-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0.5rem;
  }
`;
