import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../services';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string = null;
  serverErrors: any = {};

  constructor(private readonly router: Router, private readonly authenticationService: AuthenticationService) {
    if (this.authenticationService.isLoggedIn) {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/']);
    }
  }

  login(form: NgForm): void {
    this.authenticationService
      .login(form.value.username, form.value.password)
      .subscribe(() => {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/']);
      }, response => {
        this.errorMessage = response.message;
        this.serverErrors = response.errors || null;
      });
  }
}
