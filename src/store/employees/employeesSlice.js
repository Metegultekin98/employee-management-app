import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
  employees: [],
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload;
    },
    addEmployee: {
      reducer(state, action) {
        state.employees.push(action.payload);
      },
      prepare(employee) {
        return {
          payload: {id: nanoid(), ...employee},
        };
      },
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

export const {setEmployees, addEmployee, updateEmployee, deleteEmployee} =
  employeesSlice.actions;
export default employeesSlice.reducer;
