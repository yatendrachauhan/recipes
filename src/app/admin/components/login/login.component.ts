import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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

    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    // Make the API call to authenticate the user
    this.authService
      .authenticate(username, password)
      .subscribe((response: User) => {
        // Handle the response from the server
        if (response) {
          // Authentication successful
          // Store the token and redirect the user
        } else {
          // Authentication failed
          // Show an error message
        }
      });
  }
}
