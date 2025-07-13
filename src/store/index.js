import {configureStore} from '@reduxjs/toolkit';
import employeesReducer from './employees/employeesSlice.js';
import {loadState, saveState} from './storage.js';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
