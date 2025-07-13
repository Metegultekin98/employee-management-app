import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import '../../../src/components/data-grid/data-grid.js';

describe('<data-grid>', () => {
  const sampleColumns = [
    {key: 'name', label: 'Name'},
    {key: 'email', label: 'Email'},
  ];

  const sampleRows = [
    {name: 'Alice', email: 'alice@example.com'},
    {name: 'Bob', email: 'bob@example.com'},
  ];

  it('renders cards for each row', async () => {
    const el = await fixture(html`
      <data-grid .columns=${sampleColumns} .rows=${sampleRows}></data-grid>
    `);

    const cards = el.shadowRoot.querySelectorAll('.card');
    expect(cards.length).to.equal(2);

    const firstCard = cards[0];
    expect(firstCard.textContent).to.include('Alice');
    expect(firstCard.textContent).to.include('alice@example.com');
  });

  it('renders checkboxes when selectable=true and multiSelect=true', async () => {
    const el = await fixture(html`
      <data-grid
        .columns=${sampleColumns}
        .rows=${sampleRows}
        selectable
        multiSelect
      ></data-grid>
    `);

    const inputs = el.shadowRoot.querySelectorAll('input[type="checkbox"]');
    expect(inputs.length).to.equal(2);
  });

  it('emits selection-changed event when a card is clicked (multiSelect)', async () => {
    const el = await fixture(html`
      <data-grid
        .columns=${sampleColumns}
        .rows=${sampleRows}
        selectable
        multiSelect
      ></data-grid>
    `);

    const card = el.shadowRoot.querySelector('.card');
    const eventPromise = oneEvent(el, 'selection-changed');

    card.click();

    const event = await eventPromise;
    expect(event.detail.selectedRows.length).to.equal(1);
    expect(event.detail.selectedRows[0].name).to.equal('Alice');
  });

  it('emits selection-changed event with one item in single-select mode', async () => {
    const el = await fixture(html`
      <data-grid
        .columns=${sampleColumns}
        .rows=${sampleRows}
        selectable
        .multiSelect=${false}
      ></data-grid>
    `);

    const cards = el.shadowRoot.querySelectorAll('.card');
    const eventPromise = oneEvent(el, 'selection-changed');

    cards[1].click();

    const event = await eventPromise;
    expect(event.detail.selectedRows.length).to.equal(1);
    expect(event.detail.selectedRows[0].name).to.equal('Bob');
  });

  it('toggles off selection when same card is clicked again (multiSelect)', async () => {
    const el = await fixture(html`
      <data-grid
        .columns=${sampleColumns}
        .rows=${sampleRows}
        selectable
        multiSelect
      ></data-grid>
    `);

    const card = el.shadowRoot.querySelector('.card');
    card.click();
    card.click();

    await el.updateComplete;
    expect(el.selectedRows.length).to.equal(0);
  });

  it('does not select if selectable=false', async () => {
    const el = await fixture(html`
      <data-grid .columns=${sampleColumns} .rows=${sampleRows}></data-grid>
    `);

    const card = el.shadowRoot.querySelector('.card');
    card.click();

    await el.updateComplete;
    expect(el.selectedRows.length).to.equal(0);
  });
});
