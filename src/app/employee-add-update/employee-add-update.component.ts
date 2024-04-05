import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ADD_EMPLOYEE } from '../graphql/graphql.emp.queries';
import { UPDATE_EMPLOYEE } from '../graphql/graphql.emp.queries';
import { GET_ALL_EMPLOYEES } from '../graphql/graphql.emp.queries';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CapitalizePipePipe } from '../capitalize-pipe.pipe';

@Component({
  selector: 'app-employee-add-update',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, CapitalizePipePipe],
  templateUrl: './employee-add-update.component.html',
  styleUrls: ['./employee-add-update.component.css']
})
export class EmployeeAddUpdateComponent {
  title = 'Employee Add Update';
  employee: any = {};
  error: any;

  constructor(private apollo: Apollo, private router: Router) {
    if (history.state.employee) {
      this.employee = history.state.employee;
    }
  }

  ngOnInit() {
    console.log("--- GQL Component() Employee Add Update---");
  }

  cancelOption() {
    console.log("--- GQL cancelOption() ---")
    window.history.back();
  }


  addEmployee() {
    console.log("--- GQL addEmployee() ---")
    this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: {
        firstName: this.employee.first_name,
        lastName: this.employee.last_name,
        gender: this.employee.gender,
        email: this.employee.email,
        salary: this.employee.salary,
      },
      refetchQueries: [{
        query: GET_ALL_EMPLOYEES
      }],
    }).subscribe(
      (response) => {
        console.log('Employee added successfully', response);
        this.router.navigate(['/employees']);
      },
      (error) => {
        console.error('Error adding employee', error);
        this.error = error.message;
      }
    );
  }

  updateEmployee() {
    console.log("--- GQL updateEmployee() ---")
    this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: {
        updateEmployeeId: this.employee.id,
        firstName: this.employee.first_name,
        lastName: this.employee.last_name,
        gender: this.employee.gender,
        email: this.employee.email,
        salary: this.employee.salary,
      },
    }).subscribe(
      (response) => {
        console.log('Employee updated successfully', response);
        this.router.navigate(['/employees']);

      },
      (error) => {
        console.error('Error updating employee', error);
        this.error = error.message;
      }
    );
  }
}