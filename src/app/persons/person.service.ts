import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IPerson } from './persons-list/persons-list.component';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor() {}
  getPerson(id: number): Observable<IPerson> {
    return of({ id: 1, name: 'Hans' });
  }
  getPersons() {
    return of({ id: 2, name: 'Rita' });
  }
  getPersonDetail(id: number) {
    return of({ id: 1, name: 'Hans' });
  }
  updateOnServer(person: IPerson): Observable<IPerson> {
    console.log('Update on server:', person);
    return of(person);
  }
}
