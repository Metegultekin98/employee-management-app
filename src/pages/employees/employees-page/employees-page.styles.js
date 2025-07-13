import {css} from 'lit';

export const employeesPageStyles = css`
  main h2 {
    margin: 1rem 0 1rem 0;
    font-weight: 500;
    color: var(--color-primary);
  }

  .selections {
    display: flex;
    gap: 0.5rem;
  }

  .selections button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    opacity: 0.5;
    transition: all 0.25s ease-in-out;
  }

  .selections button:hover {
    opacity: 1;
  }
`;
