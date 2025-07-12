import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';
import '../../../src/components/language-switcher/language-switcher.js';

describe('<language-switcher>', () => {
  it('should reflect initial language from getLang()', async () => {
    const fakeGetLang = () => 'tr';
    const el = await fixture(html`
      <language-switcher .getLang=${fakeGetLang}></language-switcher>
    `);

    await el.updateComplete;

    expect(el.lang).to.equal('tr');

    const img = el.shadowRoot.querySelector('img');
    expect(img.getAttribute('src')).to.include('en.png');
  });

  it('should call setLang() when toggled', async () => {
    const fakeSetLang = sinon.spy();
    const el = await fixture(html`
      <language-switcher
        .getLang=${() => 'en'}
        .setLang=${fakeSetLang}
      ></language-switcher>
    `);

    await el.updateComplete;

    el.shadowRoot.querySelector('button').click();

    expect(fakeSetLang.calledOnceWithExactly('tr')).to.be.true;
  });

  it('should update on "lang-changed" event', async () => {
    const el = await fixture(html`
      <language-switcher .getLang=${() => 'en'}></language-switcher>
    `);

    window.dispatchEvent(new CustomEvent('lang-changed', {detail: 'tr'}));

    await el.updateComplete;

    expect(el.lang).to.equal('tr');
    const img = el.shadowRoot.querySelector('img');
    expect(img.getAttribute('src')).to.include('en.png');
  });
});
