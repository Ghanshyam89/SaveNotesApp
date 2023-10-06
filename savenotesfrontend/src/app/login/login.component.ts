import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../notes.service';
import { AuthguardGuard } from '../authguard.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup | undefined;
  error: boolean | undefined;
  loginMessage: string | undefined;
  userId: String;

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  constructor(
    private userservice: NotesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthguardGuard
  ) {
    if (this.auth.isLoggedIn()) {
        this.router.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginMessage = "Login form is invalid.";
      console.error('Login form is invalid.');
      return;
    }

    const email = this.loginForm.value.email;
    const pass = this.loginForm.value.password;

    // const formData : User = {
    //   email: this.loginForm.value.email,
    //   pass: this.loginForm.value.pass,
    //   first_name: undefined,
    //   last_name: undefined
    // }

    // const loginUrl = 'http://localhost:5000/api/login';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify({ email, pass });

    // this.http.post(loginUrl, body, { headers }).subscribe({
    this.userservice.login(body).subscribe({
      next: (response: any) => {
        console.log("Login Response: ", response);
        this.loginMessage = response.message
        // console.log(response.data)

        localStorage.setItem('userId', email);
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['dashboard']);
      },
      error: (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.error = true;
            this.loginMessage = error.error.message;
            console.error(error.error);
            this.loginForm.reset();
          } else {
            console.warn('An error occurred during login:', error.error);
            this.router.navigateByUrl('/error');
          }
        }
      }
    });
  }
}
