import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NoteComponent } from './note/note.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'notes', children: [
      { path: '', component: NotesComponent },
      { path: 'add', component: NoteComponent },
      { path: 'edit/:id', component: NoteComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
