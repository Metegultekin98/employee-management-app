import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
  employees: [],
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: {
      reducer(state, action) {
        state.employees.push(action.payload);
      },
      prepare(employee) {
        return {
          payload: {
            id: nanoid(),
            ...employee,
          },
        };
      },
    },
    updateEmployee(state, action) {
      const {id, changes} = action.payload;
      const index = state.employees.findIndex((e) => e.id === id);
      if (index !== -1) {
        state.employees[index] = {...state.employees[index], ...changes};
      }
    },
    deleteEmployee(state, action) {
      state.employees = state.employees.filter((e) => e.id !== action.payload);
    },
  },
});

export const {addEmployee, updateEmployee, deleteEmployee} =
  employeesSlice.actions;
export default employeesSlice.reducer;
