import {
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setEmployee,
} from './employeesSlice';
import {
  fetchEmployees,
  addEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
  fetchEmployeeById,
} from '../../api/employees';

export const loadEmployees = () => async (dispatch) => {
  const data = await fetchEmployees();
  dispatch(setEmployees(data));
};

export const loadEmployeeById = (id) => async (dispatch) => {
  const employee = await fetchEmployeeById(id);
  if (employee) {
    dispatch(setEmployee(employee));
  }
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
