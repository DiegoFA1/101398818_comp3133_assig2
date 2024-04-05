import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_EMPLOYEES } from '../graphql/graphql.emp.queries';
import { DELETE_EMPLOYEE } from '../graphql/graphql.emp.queries';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor, MatDialogModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

export class EmployeeListComponent {
  title = 'Employee List';
  employees: any[]= [];
  error: any;
  
  constructor(private apollo: Apollo, public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    console.log("--- GQL ngOnInit() Employee List ---")
    this.getallEmployees();
  }

  getallEmployees() {
    console.log("--- GQL allEmployees() ---")
    this.apollo.watchQuery({
      query: GET_ALL_EMPLOYEES
    }).valueChanges.subscribe(({data, error}: any) => {
      this.employees = data['getAllEmployees'];
      this.error = error;
    });
  }

  deleteEmployee(id: number) {
    console.log("--- GQL deleteEmployee() ---")
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: '200px',
      data: "Do you confirm the deletion of this employee?"
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.apollo.mutate({
          mutation: DELETE_EMPLOYEE,
          variables: {
            deleteEmployeeId: id
          },
          refetchQueries: [{
            query: GET_ALL_EMPLOYEES
          }]
        }).subscribe(({data}: any) => {
          this.employees = data.employees;
        }, (error) => {
          console.log('there was an error sending the query delete', error);
        });
      }
    });
  }


  viewEmployee(employee: any) {
    this.router.navigate(['/employee-details'], { state: { employee } });
  }
  
  addUpdateEmployee(employee: any) {
    if (employee) {
      this.router.navigate(['/employee-add-update'], { state: { employee } });
    } else {
      this.router.navigate(['/employee-add-update']);
    }
  }
  
}
