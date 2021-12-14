import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GitHubService } from '../services/github.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  id: string | undefined;
  page: string | undefined;
  isAddMode: boolean | undefined;
  singleNote: any = {};

  constructor(
    private route: ActivatedRoute,
    private githubService: GitHubService,
    public state: StateService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (this.isAddMode) {
      this.page = "Add"
      this.singleNote = {
        id: this.state.notes.length + 1,
        title: this.singleNote.title,
        content: this.singleNote.content
      };
    } else {
      this.page = "Edit"
      this.getSingleNote(this.id)
    }
  }

  public getSingleNote(_id: any) {
    this.githubService.getSingleNote(_id)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          console.log("response", response);
          this.singleNote = response;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed
        })
  }

  public submitNote() {
    if (this.isAddMode) {
      this.githubService.addNote(this.singleNote)
        .subscribe(
          (response) => {                           //next() callback
            console.log('response received')
            console.log("response", response);
            if (response) {
              this.state.fireAlert('Added!', 'Note has been added successfully', 'success')
              this.router.navigate(['/notes'])
            }
          },
          (error) => {                              //error() callback
            console.error('Request failed with error')
          },
          () => {                                   //complete() callback
            console.error('Request completed')      //This is actually not needed
          })
    } else {
      this.githubService.editNote(this.singleNote.id, this.singleNote)
        .subscribe(
          (response) => {                           //next() callback
            console.log('response received')
            console.log("response", response);
            if (response) {
              this.state.fireAlert('Updated!', 'Note has been updated successfully', 'success')
              this.router.navigate(['/notes'])
            }
          },
          (error) => {                              //error() callback
            console.error('Request failed with error')
          },
          () => {                                   //complete() callback
            console.error('Request completed')      //This is actually not needed
          })
    }
  }

}
