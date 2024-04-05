import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true' ? true : false;
  constructor(private router: Router) { }
  

  logout() {
    localStorage.setItem('isUserLoggedIn', 'false');
    this.isUserLoggedIn = false;
    this.router.navigate(['/login']);
  }

  ngOnChanges() {
    this.isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true' ? true : false;
  }

}
