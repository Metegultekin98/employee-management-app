import {
  fetchEmployees,
  fetchEmployeeById,
  addEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from '../../src/api/employees.js';
import {expect} from '@open-wc/testing';

describe('Employee API mocks', () => {
  let newEmployeeId;

  it('fetchEmployees should return array of employees', async () => {
    const employees = await fetchEmployees();
    expect(employees).to.be.an('array');
    expect(employees.length).to.be.greaterThan(0);
    expect(employees[0]).to.have.property('id');
    expect(employees[0]).to.have.property('firstName');
  });

  it('fetchEmployeeById should return correct employee by id', async () => {
    const employees = await fetchEmployees();
    const id = employees[0].id;
    const employee = await fetchEmployeeById(id);
    expect(employee).to.be.an('object');
    expect(employee.id).to.equal(id);
  });

  it('fetchEmployeeById should return null if not found', async () => {
    const employee = await fetchEmployeeById('non-existent-id');
    expect(employee).to.be.null;
  });

  it('addEmployeeApi should add and return new employee', async () => {
    const newEmpData = {
      firstName: 'Test',
      lastName: 'User',
      dateOfEmployment: '2023-01-01',
      dateOfBirth: '1990-01-01',
      phone: '1234567890',
      email: 'test.user@example.com',
      department: 'Testing',
      position: 'Junior',
    };
    const newEmp = await addEmployeeApi(newEmpData);
    expect(newEmp).to.include(newEmpData);
    expect(newEmp).to.have.property('id');
    newEmployeeId = newEmp.id;
  });

  it('updateEmployeeApi should update employee data', async () => {
    const changes = {position: 'Senior'};
    const updated = await updateEmployeeApi(newEmployeeId, changes);
    expect(updated).to.be.an('object');
    expect(updated.position).to.equal('Senior');
  });

  it('deleteEmployeeApi should remove employee and return id', async () => {
    const deletedId = await deleteEmployeeApi(newEmployeeId);
    expect(deletedId).to.equal(newEmployeeId);

    const empAfterDelete = await fetchEmployeeById(newEmployeeId);
    expect(empAfterDelete).to.be.null;
  });
});
