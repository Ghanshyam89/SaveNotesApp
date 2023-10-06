import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../notes.service';
import { AuthguardGuard } from '../authguard.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private notes: NotesService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthguardGuard
  ) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  registrationForm!: FormGroup;
  error = false;
  errorMessage = '';

  get email() { return this.registrationForm.get('email'); }
  get firstname() { return this.registrationForm.get('firstName'); }
  get lastname() { return this.registrationForm.get('lastName'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      confirmPassword: ['', [Validators.required, this.matchValidator('password')]]
    });
  }

  matchValidator(controlName: string) {
    return (control: AbstractControl) => {
      const formGroup = control.parent as FormGroup;
      if (formGroup && control.value !== formGroup.controls[controlName].value) {
        return { mismatch: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.registrationForm.valid) {

      const formData = {
        email: this.email.value,
        first_name: this.firstname.value,
        last_name: this.lastname.value,
        pass: this.password.value
      };

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post("http://localhost:5000/api/user", formData, { headers }).subscribe({
        next: (response: any) => {
          console.log('Successfully registered! \nRedirecting to Login Page ...');
          alert('Successfully registered! \nRedirecting to Login Page ...');
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 409) {
              this.error = true;
              this.errorMessage = 'Conflict: User already exists';
            } else {
              console.warn('Response:', error);
            }
          }
        }
      });

    } else {
      this.errorMessage = "Warning: The form is Invalid.";
    }
  }           // onSubmit() ends here
}
