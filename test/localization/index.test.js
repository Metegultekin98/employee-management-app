import {expect} from '@open-wc/testing';
import sinon from 'sinon';
import {
  getCurrentLang,
  setLang,
  loadJsonFile,
  t,
  cache,
} from '../../src/localization/index.js';

describe('localization', () => {
  const lang = 'en';
  const scope = 'common';
  const testJson = {
    welcome: 'Welcome',
    nested: {key: 'Nested Value'},
  };

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
  });

  describe('getCurrentLang', () => {
    it('returns lang from localStorage if available', () => {
      localStorage.setItem('lang', 'tr');
      expect(getCurrentLang()).to.equal('tr');
    });

    it('falls back to document.documentElement.lang', () => {
      document.documentElement.lang = 'de';
      expect(getCurrentLang()).to.equal('de');
    });

    it('defaults to "en"', () => {
      expect(getCurrentLang()).to.equal('en');
    });
  });

  describe('setLang', () => {
    it('sets localStorage and document.lang and dispatches event', () => {
      const spy = sinon.spy();
      window.addEventListener('lang-changed', spy);

      setLang('tr');

      expect(localStorage.getItem('lang')).to.equal('tr');
      expect(document.documentElement.lang).to.equal('tr');
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0].detail).to.equal('tr');

      window.removeEventListener('lang-changed', spy);
    });
  });

  describe('loadJsonFile', () => {
    let fetchStub;

    beforeEach(() => {
      fetchStub = sinon.stub(window, 'fetch').resolves({
        ok: true,
        json: async () => testJson,
      });
    });

    afterEach(() => {
      fetchStub.restore();
    });

    it('fetches and caches JSON data', async () => {
      const data = await loadJsonFile(lang, scope);
      expect(fetchStub.calledOnce).to.be.true;
      expect(data.welcome).to.equal('Welcome');

      await loadJsonFile(lang, scope);
      expect(fetchStub.calledOnce).to.be.true;
    });

    it('throws if fetch fails', async () => {
      fetchStub.restore();
      sinon.stub(window, 'fetch').resolves({ok: false});

      try {
        await loadJsonFile('invalid', 'scope');
        throw new Error('Should have thrown');
      } catch (e) {
        expect(e.message).to.include('Failed to load');
      }

      window.fetch.restore();
    });
  });

  describe('t()', () => {
    let fetchStub;

    beforeEach(() => {
      for (const key in cache) {
        delete cache[key];
      }
    });

    beforeEach(() => {
      fetchStub = sinon.stub(window, 'fetch').callsFake((url) => {
        if (url.endsWith('/en/common.json')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              welcome: 'Welcome',
              nested: {
                message: 'Hello',
              },
            }),
          });
        }
        return Promise.resolve({ok: false});
      });
    });

    afterEach(() => {
      fetchStub.restore();
    });

    it('translates flat keys correctly', async () => {
      const translated = await t('common.welcome', 'en');
      expect(translated).to.equal('Welcome');
    });

    it('translates nested keys', async () => {
      const translated = await t('common.nested.message', 'en');
      expect(translated).to.equal('Hello');
    });

    it('returns fallback string if key is missing', async () => {
      const translated = await t('common.unknown.key', 'en');
      expect(translated).to.equal('[common.unknown.key]');
    });
  });
});
