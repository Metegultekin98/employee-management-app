import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import sinon from 'sinon';
import '../../../src/components/modal-dialog/modal-dialog.js';

describe('<modal-dialog>', () => {
  it('renders with a title and slot content', async () => {
    const el = await fixture(html`
      <modal-dialog open title="Test Modal">
        <p>Modal content</p>
      </modal-dialog>
    `);

    const title = el.shadowRoot.querySelector('#modal-title');
    const slot = el.shadowRoot.querySelector('slot');
    expect(title.textContent).to.equal('Test Modal');
    expect(slot).to.exist;
  });

  it('hides when open is false', async () => {
    const el = await fixture(
      html`<modal-dialog .open=${false}></modal-dialog>`
    );
    expect(getComputedStyle(el).display).to.equal('none');
  });

  it('closes when Escape key is pressed', async () => {
    const el = await fixture(html`<modal-dialog open></modal-dialog>`);
    const spy = sinon.spy(el, 'close');

    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));

    await el.updateComplete;
    expect(spy.calledOnce).to.be.true;
  });

  it('closes and emits modal-closed when clicking the close button', async () => {
    const el = await fixture(html`<modal-dialog open></modal-dialog>`);
    const button = el.shadowRoot.querySelector('button.close-button');

    setTimeout(() => button.click());
    const event = await oneEvent(el, 'modal-closed');

    expect(event).to.exist;
    expect(el.open).to.be.false;
  });

  it('closes and emits modal-closed when clicking backdrop', async () => {
    const el = await fixture(html`<modal-dialog open></modal-dialog>`);
    const backdrop = el.shadowRoot.querySelector('.backdrop');

    setTimeout(() => backdrop.click());
    const event = await oneEvent(el, 'modal-closed');

    expect(event).to.exist;
    expect(el.open).to.be.false;
  });

  it('does not close when clicking inside the modal content', async () => {
    const el = await fixture(html`<modal-dialog open></modal-dialog>`);
    const modalSection = el.shadowRoot.querySelector('.modal');

    const spy = sinon.spy(el, 'close');
    modalSection.click();

    await el.updateComplete;
    expect(spy.called).to.be.false;
  });
});
