import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE } from '../graphql/graphql.emp.queries';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  title = 'Employee Details';
  employee: any;
  error: any;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    console.log("--- GQL Component() ---");
  }

  ngOnInit() {
    console.log("--- GQL ngOnInit() ---")
    this.getEmployee();
  }

  goBack() {
    window.history.back();
  }

  getEmployee() {
    console.log("--- GQL getEmployee() ---")
    this.apollo.watchQuery({
      query: GET_EMPLOYEE,
      variables: {
        getEmployeeId: history.state.employee.id
      }
    }).valueChanges.subscribe(({data, error}: any) => {
      this.employee = data['getEmployee'];
      this.error = error;
    });
  }

}
