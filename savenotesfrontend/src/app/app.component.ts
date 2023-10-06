import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'savenotesfrontend';
  
  isNavbarCollapsed = true;

  constructor(private router: Router) { console.log('App Component LoggedIn:', localStorage.getItem('isLoggedIn')); }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    console.log('App Component LoggedIn:', localStorage.getItem('isLoggedIn'));
    this.router.navigate(['/login']);
  }
}
