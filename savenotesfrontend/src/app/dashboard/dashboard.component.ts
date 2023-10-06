import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../entities/notes';
import { NotesService } from '../notes.service';
import { AuthguardGuard } from '../authguard.guard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private note: NotesService, private router: Router, private route: ActivatedRoute, private auth: AuthguardGuard) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  notes: Note[] = [];

  isLoggedIn: any;

  ngOnInit(): void {

    this.route.url.subscribe(urlSegments => {

      this.isLoggedIn = localStorage.getItem('isLoggedIn');

      this.note.getNotes(localStorage.getItem('userId')).subscribe((notesList: any) => {
        console.log(notesList)
        this.notes = notesList as Note[]
        console.log(this.notes)

        console.log('LoggedIn:', localStorage.getItem('isLoggedIn'));
      })

    });
  }

  // Delete on ButtonClick
  onButtonClick(noteId): void {
    const userConfirmed = window.confirm("Are you sure you want to delete this note?");

    if (userConfirmed) {
      this.note.deleteNote(noteId).subscribe((response) => {
        if (response.status === 204) {
          console.log("Note deleted successfully!");
          alert("Note deleted successfully!");
          this.notes = this.notes.filter(note => note.id !== noteId);
        } else {
          console.error("Failed to delete note.");
          alert("Failed to delete note.");
        }
      });
    }
    else {
      return
    }
  }

  toggleContent(note: Note) {
    note.showFullContent = !note.showFullContent;
}


}
