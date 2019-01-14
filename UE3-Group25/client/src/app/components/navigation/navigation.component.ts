import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  doLogout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  isLogin() {
    return this.getLocation() === 'login';
  }

  isOptions() {
    return this.getLocation() === 'options';
  }

  isOverview() {
    return this.getLocation() === 'overview';
  }

  private getLocation() {
    return window.location.pathname.substring(1);
  }

}
