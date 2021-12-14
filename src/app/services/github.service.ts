import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { data } from 'jquery';

@Injectable()
export class GitHubService {

  baseURL: string = "https://my-json-server.typicode.com/arpitupadhyay/vittorcloud-json/Notes/asdasd";

  constructor(private http: HttpClient) {
  }

  addNote(note: any): Observable<any> {
    return this.http.post(this.baseURL, note)
  }

  getNotes(): Observable<any> {
    return this.http.get(this.baseURL)
  }

  getSingleNote(_id: any): Observable<any> {
    return this.http.get(this.baseURL + `/${_id}`)
  }

  editNote(_id: any, data: any): Observable<any> {
    return this.http.patch(this.baseURL + `/${_id}`, data)
  }

  deleteNote(id: any): Observable<any> {
    return this.http.delete(this.baseURL + `/${id}`)
  }

}