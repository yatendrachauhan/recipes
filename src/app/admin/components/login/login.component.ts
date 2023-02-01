import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAPIResponse } from '../../interfaces/login-form.interface';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  isError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.isError = false;

    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    // Make the API call to authenticate the user
    this.authService
      .authenticate(username, password)
      .subscribe({
        next: (response: LoginAPIResponse) => {
          this.snackBar.open(response.message, 'Close', {
            duration: 5000,
            panelClass: ['success']
          });
          this.authService.login(username, password);
  
          this.router.navigateByUrl('admin/dashboard');
        },
        error: (err) => {
          if(err?.error?.message) {
            this.snackBar.open(err.error.message, 'Close', {
              duration: 5000,
              panelClass: ['error']
            });
          } else {
            this.snackBar.open(err.message, 'Close', {
              duration: 5000,
              panelClass: ['error']
            });
          }
        }
      });
  }
}
