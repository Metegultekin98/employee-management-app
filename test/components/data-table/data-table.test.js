import {fixture, expect, html, oneEvent} from '@open-wc/testing';
import '../../../src/components/data-table/data-table.js';

describe('<data-table>', () => {
  const sampleColumns = [
    {key: 'name', label: 'Name'},
    {key: 'email', label: 'Email'},
  ];

  const sampleRows = [
    {name: 'Alice', email: 'alice@example.com'},
    {name: 'Bob', email: 'bob@example.com'},
  ];

  it('renders a table with rows and columns', async () => {
    const el = await fixture(html`
      <data-table .columns=${sampleColumns} .rows=${sampleRows}></data-table>
    `);

    const headers = el.shadowRoot.querySelectorAll('th');
    const cells = el.shadowRoot.querySelectorAll('td');

    expect(headers.length).to.equal(2);
    expect(headers[0].textContent.trim()).to.equal('Name');
    expect(headers[1].textContent.trim()).to.equal('Email');

    expect(cells.length).to.equal(4);
  });

  it('renders selection checkbox when selectable is true', async () => {
    const el = await fixture(html`
      <data-table
        .columns=${sampleColumns}
        .rows=${sampleRows}
        selectable
        multiSelect
      ></data-table>
    `);

    const checkboxes = el.shadowRoot.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).to.be.greaterThan(0);
  });

  it('emits selection-changed event when row is selected', async () => {
    const el = await fixture(html`
      <data-table
        .columns=${sampleColumns}
        .rows=${sampleRows}
        selectable
        multiSelect
      ></data-table>
    `);

    const row = el.shadowRoot.querySelectorAll('tr')[1];
    const eventPromise = oneEvent(el, 'selection-changed');
    row.click();

    const e = await eventPromise;
    expect(e.detail.selectedRows.length).to.equal(1);
    expect(e.detail.selectedRows[0].name).to.equal('Alice');
  });

  it('selects all rows when select-all checkbox is clicked', async () => {
    const el = await fixture(html`
      <data-table
        .columns=${sampleColumns}
        .rows=${sampleRows}
        selectable
        multiSelect
      ></data-table>
    `);

    const selectAll = el.shadowRoot.querySelector(
      'thead input[type="checkbox"]'
    );
    const eventPromise = oneEvent(el, 'selection-changed');

    selectAll.click();

    const e = await eventPromise;
    expect(e.detail.selectedRows.length).to.equal(2);
  });

  it('toggles row selection off if already selected', async () => {
    const el = await fixture(html`
      <data-table
        .columns=${sampleColumns}
        .rows=${sampleRows}
        selectable
        multiSelect
      ></data-table>
    `);

    const row = el.shadowRoot.querySelectorAll('tr')[1];
    row.click();
    row.click();

    await el.updateComplete;

    expect(el.selectedRows.length).to.equal(0);
  });
});
