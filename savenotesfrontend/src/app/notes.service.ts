import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './entities/notes';
import { User } from './entities/user';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:5000/api/"

  // User Services

  setUser(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "user", data,{headers});
  }

  getUser(data: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "user/" + data,{headers});
  }

  login(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "login", data, { headers })
  }

  // Note Services
  setNote(userId: String, note: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "notes/" + userId, note, { headers })
  }

  getNotes(userId: String) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "notes/" + userId + "/recent",{headers})
  }

  deleteNote(noteId: number) {
    return this.http.delete(this.url + "notes/delete/" + noteId, { observe: 'response' })
  }
}
