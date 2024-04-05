import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { SIGNUP } from '../graphql/graphql.user.queries';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  user_username: string='';
  user_password: string='';
  user_email: string='';
  error: string='';

  constructor(private apollo: Apollo, private router: Router) {
    console.log('User Register Component');
   }

  register() {
    this.apollo.mutate({
      mutation: SIGNUP,
      variables: {
        username: this.user_username,
        password: this.user_password,
        email: this.user_email
      }
    }).subscribe(
      (response) => {
        console.log('User registered successfully');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.error = error;
      }
    );
    
  }

}
