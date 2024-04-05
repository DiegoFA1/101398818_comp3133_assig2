import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../graphql/graphql.user.queries';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  user_username_email:string = '';
  user_password:string = '';
  error:string = '';



  constructor(private apollo: Apollo, private router: Router, private authService: AuthService) {
    console.log("--- User Login Component() ---");
  
  }

  login() {
    console.log("--- User Login() ---");
    this.apollo.query({
      query: LOGIN,
      variables: {
        usernameEmail: this.user_username_email,
        password: this.user_password,
      },
    })
    .subscribe(
      (response) => {
        this.authService.login();
        this.router.navigate(['/employee-list']);
        
      },
      (error) => {
        console.error('Error logging in user', error);
        this.error = "There was an error logging in. Please try again.";
      }, 
    );

    
  }

  
}
