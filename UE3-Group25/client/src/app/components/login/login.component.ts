import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationRequest } from '../../models/authentication.request';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginUrl = 'http://localhost:8081/login';

  private errorMessage;

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.errorMessage = null;

    const authReq: AuthenticationRequest = {
      username: form.value.username,
      password: form.value.password
    };

    this.http.post<any>(this.loginUrl, authReq, httpOptions).subscribe(
      resp => {
        localStorage.setItem('loggedIn', 'true');
        const url = this.route.snapshot.queryParams['navigateTo'] || '/overview';
        this.router.navigate([url]);
      },
      error => {
        if (error.status === 401) {
          // Unauthorized
          this.errorMessage = 'Benutzername und/oder Passwort falsch!';
        } else {
          this.errorMessage = 'Ein unerwarteter Fehler ist aufgetreten!';
        }
      }
    );
  }
}
