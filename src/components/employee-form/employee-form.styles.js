import {css} from 'lit';

export const employeeFormStyles = css`
  .form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    column-gap: 8rem;
    row-gap: 3rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: 300;
    color: var(--color-text-secondary);
    font-size: 0.9rem;
  }

  .error {
    color: red;
    font-size: 0.8rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  input,
  select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
    color: var(--color-text-secondary);
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent
      url("data:image/svg+xml;utf8,<svg fill='%23ccc' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")
      no-repeat;
    background-position-x: 97%;
    background-position-y: 7.25px;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    background: url('/public/icons/calendar.png') no-repeat center center;
    background-size: contain;
    color: transparent;
    opacity: 1;
    cursor: pointer;
  }

  input[type='date']:in-range::-webkit-datetime-edit-year-field,
  input[type='date']:in-range::-webkit-datetime-edit-month-field,
  input[type='date']:in-range::-webkit-datetime-edit-day-field,
  input[type='date']:in-range::-webkit-datetime-edit-text {
    color: transparent;
  }
`;
