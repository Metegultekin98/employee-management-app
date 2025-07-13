/** @typedef {import('@vaadin/router').Route} Route */
import {loadJsonFile} from '../localization/index.js';

/** @type {ReadonlyArray<Route>} */
export const routes = [
  {
    path: '/',
    component: 'main-layout',
    action: async () => {
      await Promise.all([
        import('../layouts/main-layout/main-layout.js'),
        loadJsonFile('en', 'common'),
      ]);
    },
    children: [
      {
        path: '',
        component: 'home-page',
        action: async () => {
          await import('../pages/home/home-page.js');
        },
      },
      {
        path: 'employees',
        component: 'employees-page',
        action: async () => {
          await import('../pages/employees/employees-page/employees-page.js');
        },
      },
      {
        path: 'employees/add',
        component: 'employee-add-page',
        action: async () => {
          await import(
            '../pages/employees/employee-add-page/employee-add-page.js'
          );
        },
      },
      {
        path: 'employees/:id',
        component: 'employee-edit-page',
        action: async () => {
          await import(
            '../pages/employees/employee-edit-page/employee-edit-page.js'
          );
        },
      },
    ],
  },
];
