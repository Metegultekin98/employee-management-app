import {Router} from '@vaadin/router';
import {routes} from './router/index.js';

const outlet = document.querySelector('#outlet');

if (!outlet) {
  throw new Error('Missing #outlet element in index.html');
}

export const router = new Router(outlet);
router.setRoutes(routes);

const originalDefine = customElements.define.bind(customElements);
customElements.define = (name, constructor) => {
  if (customElements.get(name)) return;
  originalDefine(name, constructor);
};

window.process = {
  env: {
    NODE_ENV: 'development',
  },
};
