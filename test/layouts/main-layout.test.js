import {fixture, html, expect, waitUntil} from '@open-wc/testing';
import '../../src/layouts/main-layout/main-layout.js';

describe('<main-layout>', () => {
  const fakeT = async (key) => {
    if (key === 'common.mainLayout') {
      return {
        employees: 'Employees',
        addEmployee: 'Add Employee',
      };
    }
    return `[${key}]`;
  };

  it('renders navigation with translated text', async () => {
    const el = await fixture(html`<main-layout .t=${fakeT}></main-layout>`);
    await waitUntil(() => el.navigation && el.navigation.employees);

    const links = el.shadowRoot.querySelectorAll('nav a');
    expect(links[0].textContent).to.include('Employees');
    expect(links[1].textContent).to.include('Add Employee');
  });
});
