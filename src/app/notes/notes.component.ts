import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GitHubService } from '../services/github.service';
import { StateService } from '../services/state.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: any = [];

  constructor(
    private githubService: GitHubService,
    private router: Router,
    public state: StateService
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }

  public getNotes() {
    this.githubService.getNotes()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          console.log("response", response);
          this.state.notes = response;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed
        })
  }

  public confirmDelete(note: any) {
    Swal.fire({
      title: 'Are you sure want to remove this note?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        this.deleteNote(note)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

  async deleteNote(id: any) {
    let _id = id.id
    await this.githubService.deleteNote(_id)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          console.log("response", response);
          this.notes = response;
          this.state.fireAlert('Deleted!', 'Your imaginary file haas been deleted', 'success')
          return this.notes
        },
        (error) => {
          this.state.fireAlert('Deleted!', 'Something went wrong please try again', 'error')
          return error
        })
  }

  public addNote() {
    this.router.navigate(['/notes/add/']);
  }

  public editNote(note: any) {
    let _id = note.id;
    this.router.navigate([`/notes/edit/${_id}`])
  }

}
