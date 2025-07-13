import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import sinon from 'sinon';
import '../../../src/components/pagination-controls/pagination-controls.js';

describe('<pagination-controls>', () => {
  it('renders correct number of page buttons for <= 7 total pages', async () => {
    const el = await fixture(html`
      <pagination-controls
        .totalItems=${30}
        .itemsPerPage=${5}
        .currentPage=${1}
      ></pagination-controls>
    `);

    const buttons = el.shadowRoot.querySelectorAll('button:not(.arrows)');
    expect(buttons.length).to.equal(6);
  });

  it('renders ellipsis when total pages > 7 and currentPage is near start', async () => {
    const el = await fixture(html`
      <pagination-controls
        .totalItems=${100}
        .itemsPerPage=${10}
        .currentPage=${2}
      ></pagination-controls>
    `);

    const spans = el.shadowRoot.querySelectorAll('span');
    expect([...spans].some((s) => s.textContent.includes('...'))).to.be.true;
  });

  it('renders ellipsis when total pages > 7 and currentPage is near end', async () => {
    const el = await fixture(html`
      <pagination-controls
        .totalItems=${100}
        .itemsPerPage=${10}
        .currentPage=${9}
      ></pagination-controls>
    `);

    const spans = el.shadowRoot.querySelectorAll('span');
    expect([...spans].some((s) => s.textContent.includes('...'))).to.be.true;
  });

  it('emits "page-changed" event with correct page on click', async () => {
    const el = await fixture(html`
      <pagination-controls
        .totalItems=${50}
        .itemsPerPage=${10}
        .currentPage=${2}
      ></pagination-controls>
    `);

    const page3Btn = [...el.shadowRoot.querySelectorAll('button')].find(
      (b) => b.textContent.trim() === '3'
    );

    setTimeout(() => page3Btn.click());
    const event = await oneEvent(el, 'page-changed');
    expect(event.detail.page).to.equal(3);
  });

  it('does not emit "page-changed" when clicking on the current page', async () => {
    const el = await fixture(html`
      <pagination-controls
        .totalItems=${30}
        .itemsPerPage=${10}
        .currentPage=${2}
      ></pagination-controls>
    `);

    const page2Btn = [...el.shadowRoot.querySelectorAll('button')].find(
      (b) => b.textContent.trim() === '2'
    );

    const spy = sinon.spy();
    el.addEventListener('page-changed', spy);
    page2Btn.click();

    await el.updateComplete;
    expect(spy.called).to.be.false;
  });

  it('disables previous arrow on first page', async () => {
    const el = await fixture(html`
      <pagination-controls
        .totalItems=${50}
        .itemsPerPage=${10}
        .currentPage=${1}
      ></pagination-controls>
    `);

    const arrows = el.shadowRoot.querySelectorAll('button.arrows');
    expect(arrows[0].disabled).to.be.true;
    expect(arrows[1].disabled).to.be.false;
  });

  it('disables next arrow on last page', async () => {
    const el = await fixture(html`
      <pagination-controls
        .totalItems=${50}
        .itemsPerPage=${10}
        .currentPage=${5}
      ></pagination-controls>
    `);

    const arrows = el.shadowRoot.querySelectorAll('button.arrows');
    expect(arrows[0].disabled).to.be.false;
    expect(arrows[1].disabled).to.be.true;
  });

  it('renders active class on current page button', async () => {
    const el = await fixture(html`
      <pagination-controls
        .totalItems=${50}
        .itemsPerPage=${10}
        .currentPage=${3}
      ></pagination-controls>
    `);

    const activeBtn = el.shadowRoot.querySelector('button.active');
    expect(activeBtn.textContent.trim()).to.equal('3');
  });
});
