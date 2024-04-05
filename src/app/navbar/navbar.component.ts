import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterLink, NgIf],
  standalone: true,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isUserLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    this.authService.authStatus.subscribe((loggedIn: boolean) => {
      this.isUserLoggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}