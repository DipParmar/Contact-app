import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './interface/contact';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts = [];

  /**
   *
   */
  constructor(private http: HttpClient) { }

  /**
   *
   */
  fetchContacts(): Observable<Contact[]> {
    if (this.contacts.length === 0) {
      return this.http.get<Contact[]>('api/contacts.json')
        .pipe(
          tap(contacts => { this.contacts = contacts; }),
          catchError(error => {
            return this.handleError;
          })
        );
    } else {
      return of(this.contacts);
    }
  }

  /**
   *
   */
  handleError(error: Response) {
    throwError(error);
  }

  /**
   *
   */
  deleteContact(index) {
    this.contacts.splice(index, 1);
  }

  /**
   *
   */
  getContact(index){
      return this.contacts[index];
  }

  /**
   *
   */
  updateContact(index, updatedContact) {
    this.contacts[index] = updatedContact;
  }
}
