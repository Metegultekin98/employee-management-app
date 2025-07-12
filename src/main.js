import {Router} from '@vaadin/router';
import {routes} from './router/index.js';

const outlet = document.querySelector('#outlet');

if (!outlet) {
  throw new Error('Missing #outlet element in index.html');
}

const router = new Router(outlet);
router.setRoutes(routes);
