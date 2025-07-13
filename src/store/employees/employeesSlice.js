import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
  employees: [],
  employee: {},
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload;
    },
    setEmployee(state, action) {
      const {id, ...employee} = action.payload;
      state.employee = {...employee, id: id || nanoid()};
    },
    addEmployee(state, action) {
      state.employees.push(action.payload);
    },
    updateEmployee(state, action) {
      const {id, changes} = action.payload;
      const i = state.employees.findIndex((e) => e.id === id);
      if (i !== -1) state.employees[i] = {...state.employees[i], ...changes};
    },
    deleteEmployee(state, action) {
      state.employees = state.employees.filter((e) => e.id !== action.payload);
    },
  },
});

export const {
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setEmployee,
} = employeesSlice.actions;
export default employeesSlice.reducer;
