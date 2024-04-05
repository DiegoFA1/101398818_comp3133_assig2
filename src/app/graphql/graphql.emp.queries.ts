import {gql} from 'apollo-angular'

const GET_ALL_EMPLOYEES = gql`query GetAllEmployees {
    getAllEmployees {
      id
      first_name
      last_name
      email
      gender
      salary
    }
  }`;

const GET_EMPLOYEE = gql`query GetEmployee($getEmployeeId: ID!) {
    getEmployee(id: $getEmployeeId) {
      id
      first_name
      last_name
      email
      gender
      salary
    }
}`;

const ADD_EMPLOYEE = gql`mutation AddEmployee($firstName: String, $lastName: String, $gender: String, $email: String, $salary: Float) {
    addEmployee(first_name: $firstName, last_name: $lastName, gender: $gender, email: $email, salary: $salary) {
      email
      first_name
      gender
      id
      last_name
      salary
    }
}`;

const UPDATE_EMPLOYEE = gql`mutation UpdateEmployee($updateEmployeeId: ID!, $firstName: String, $lastName: String, $email: String, $gender: String, $salary: Float) {
    updateEmployee(id: $updateEmployeeId, first_name: $firstName, last_name: $lastName, email: $email, gender: $gender, salary: $salary) {
      id
      first_name
      last_name
      email
      gender
      salary
    }
}`;

const DELETE_EMPLOYEE = gql`mutation DeleteEmployee($deleteEmployeeId: ID!) {
  deleteEmployee(id: $deleteEmployeeId) {
    id
    first_name
    last_name
    email
    gender
    salary
  }
}`;

export {GET_ALL_EMPLOYEES, GET_EMPLOYEE, ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE}