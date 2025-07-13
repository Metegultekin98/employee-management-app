import {
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from './employeesSlice';
import {
  fetchEmployees,
  addEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from '../../api/employees';

export const loadEmployees = () => async (dispatch) => {
  const data = await fetchEmployees();
  dispatch(setEmployees(data));
};

export const createEmployee = (employee) => async (dispatch) => {
  const result = await addEmployeeApi(employee);
  dispatch(addEmployee(result));
};

export const modifyEmployee = (id, changes) => async (dispatch) => {
  await updateEmployeeApi(id, changes);
  dispatch(updateEmployee({id, changes}));
};

export const removeEmployee = (id) => async (dispatch) => {
  await deleteEmployeeApi(id);
  dispatch(deleteEmployee(id));
};
