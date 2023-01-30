import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/login-form.interface';
import { AuthService } from '../../services/auth.service';

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
    private router: Router
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

    // this.authService.login(username);

    // this.router.navigateByUrl('admin/dashboard');

    // Make the API call to authenticate the user
    this.authService.authenticate(username, password).subscribe(
      (response: User) => {
        // Handle the response from the server
        this.authService.login(username);
        this.router.navigateByUrl('admin/dashboard');
      },
      (error) => {
        this.isError = true;
      }
    );
  }
}
