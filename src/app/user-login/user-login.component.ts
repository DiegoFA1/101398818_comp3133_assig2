import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../graphql/graphql.user.queries';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  username_email:string = '';
  password:string = '';
  error:string = '';



  constructor(private apollo: Apollo, private router: Router, private authService: AuthService) {
    console.log("--- User Login Component() ---");
  
  }

  login() {
    console.log("--- User Login() ---");
    this.apollo.query({
      query: LOGIN,
      variables: {
        usernameEmail: this.username_email,
        password: this.password,
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
