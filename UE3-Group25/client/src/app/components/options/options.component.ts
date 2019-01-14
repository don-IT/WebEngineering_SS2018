import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ViewChild } from '@angular/core';

import { PasswordChangeRequest } from '../../models/password.change.request';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit, AfterViewInit {

  private pwdChangeUrl = 'http://localhost:8081/changepassword';

  private validationErrorMessage;
  private serverMessage;
  private isErrorMessage = false;

  @ViewChild('pwdChangeForm') pwdChangeForm: NgForm;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.pwdChangeForm.control.valueChanges.subscribe(_ => {
      if (this.pwdChangeForm.controls['newpassword'] &&
      this.pwdChangeForm.controls['newpassword'].valid &&
      this.pwdChangeForm.controls['repeatpassword'] &&
      this.pwdChangeForm.controls['repeatpassword'].valid &&
      this.pwdChangeForm.value.newpassword !== this.pwdChangeForm.value.repeatpassword) {
        this.validationErrorMessage = 'Die Passwort-Wiederholung stimmt nicht mit dem neuen Passwort überein!';
      } else {
        this.validationErrorMessage = null;
      }
    });
  }

  onSubmit(form: NgForm) {
    this.serverMessage = null;

    if (!this.passwordsEqual(form)) {
      return;
    }

    const reqBody: PasswordChangeRequest = {
      oldPassword: form.value.oldpassword,
      newPassword: form.value.newpassword
    };

    this.http.post<any>(this.pwdChangeUrl, reqBody, httpOptions).subscribe(
      resp => {
        this.isErrorMessage = false;
        this.serverMessage = 'Das Passwort wurde erfolgreich geändert.';
      },
      error => {
        this.isErrorMessage = true;
        if (error.status === 401) {
          // Unauthorized
          this.serverMessage = 'Altes Passwort falsch!';
        } else {
          this.serverMessage = 'Ein unerwarteter Fehler ist aufgetreten!';
        }
      }
    );
  }

  public passwordsEqual(form: NgForm): boolean {
    if (form.controls['newpassword'] && form.controls['newpassword'].valid &&
    form.controls['repeatpassword'] && form.controls['repeatpassword'].valid &&
    form.value.newpassword !== form.value.repeatpassword) {
      return false;
    } else {
      return true;
    }
  }

}
