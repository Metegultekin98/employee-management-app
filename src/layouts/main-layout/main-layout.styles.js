import {css} from 'lit';

export const mainLayoutStyles = css`
  nav {
    padding: 0.75rem;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
  }

  main {
    padding: 4.5rem 2rem 2rem 2rem;
    background: var(--color-background);
    min-height: 100vh;
  }

  nav .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  nav .logo img {
    height: 32px;
    border-radius: 4px;
  }

  nav .logo-text {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
  }

  nav a {
    text-decoration: none;
    color: var(--color-primary);
    font-weight: 500;
    display: flex;
    align-items: center;
    opacity: 0.5;
    transition: all 0.25s ease-in-out;
  }

  nav a:hover {
    opacity: 1;
  }

  nav .links {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
