import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthguardGuard } from '../authguard.guard';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  constructor(
    private notes: NotesService,
    private formBuilder: FormBuilder,
    private auth: AuthguardGuard,
    private router: Router
  ) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  addForm!: FormGroup;
  error = false;
  errorMessage = '';

  get title() { return this.addForm.get('title'); }
  get content() { return this.addForm.get('content'); }
  // get timestamp() { return new Date(); }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9@;*+, \-]?){1,500}$/)]],
      content: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9@;*+, \-]?){1,500}$/)]]
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
    if (this.addForm.valid) {

      const formData = {
        title: this.title.value,
        content: this.content.value,
        timestamp: new Date().toISOString().slice(0, 19)
      };
      console.log("Time: ",formData.timestamp)
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.notes.setNote(localStorage.getItem('userId'), formData).subscribe({
        next: (response: any) => {
          console.log("Saving the Note", formData);
          alert('You Successfully Added a Note!');
          this.addForm.reset();
        },
        error: (error: any) => {
          console.log("An Error occurred while saving note!");
          if (error instanceof HttpErrorResponse) {
            if (error.status === 409) {
              this.error = true;
              this.errorMessage = 'Conflict: Something Went wrong!';
            } else {
              console.warn('Response:', error);
            }
          }
        }
      });
    } else {
      this.error = true;
      this.errorMessage = "Warning: The form is Invalid.";
    }
  }           // onSubmit() ends here
}
