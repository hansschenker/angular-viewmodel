import { Component, OnInit } from '@angular/core';
import { Subject, Observable, merge, of } from 'rxjs';
import { PersonService } from '../person.service';
import { map, mergeMap, scan, tap } from 'rxjs/operators';

export interface IPerson {
  id: number;
  name: string;
}

export interface IPersonDetail {
  person: IPerson;
}

export interface IPersonVm {
  persons: IPerson[];
  personDetail: IPersonDetail;
}

@Component({
  selector: 'persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css'],
})
export class PersonsListComponent {
  // this subject will be used to pass the person object
  // when selecting a person from the list
  // <div class="personrow" *ngFor="let person of vm.persons" (click)="personDetailSubj.next(person)"> ... </div>
  public personDetailState = new Subject<IPerson>();
  public vm$: Observable<IPersonVm>;
  //public personList$;

  constructor(private personService: PersonService) {
    // retrieving list of persons (could be a http request)
    const personList$ = this.personService
      .getPersons()
      .pipe(map((persons) => (vm: IPersonVm) => ({ ...vm, persons })));

    // select a person, get detail and set it on viewmodel
    const personDetail$ = this.personDetailState.pipe(
      mergeMap((person) => this.personService.getPersonDetail(person.id)),
      map((personDetail) => (vm: IPersonVm) => ({ ...vm, personDetail }))
    );

    // in this example the initial viewmodel state is provided with the second
    // parameter of the scan function. Alternatively one could provide an initial
    // state with the rxjs of function
    const vm$ = merge(personList$, personDetail$).pipe(
      scan(
        (vm: IPersonVm, mutationFn: (vm: IPersonVm) => IPersonVm) => (
          mutationFn(vm), {}
        )
      ),
      tap((data) => console.dir('vm:', data)),

      scan(
        (vm: IPersonVm, mutationFn: (vm: IPersonVm) => IPersonVm) =>
          mutationFn(vm),
        { persons: [{ id: 1, name: 'Hans' }], personDetail: null }
      )
    );
    //.subscribe((ps) => (this.personList$ = ps));
  } // constructor

  /***  add example ***/
  // add
  public addState = new Subject<IPerson>();
  // don't forget to add addPerson$ to the merge operator
  addPerson$ = this.addState.pipe(
    // spread operator is used on the existing persons list
    // to add the new person
    map((newPerson) => (vm: IPersonVm) => ({
      ...vm,
      persons: [...vm.persons, newPerson],
    }))
  );

  /*** delete example ***/
  public deleteState = new Subject<IPerson>();
  deletePerson$ = this.deleteState.pipe(
    map((personToDelete) => (vm: IPersonVm) => ({
      ...vm,
      persons: vm.persons.filter((p) => p !== personToDelete),
    }))
  );

  /*** update example ***/
  public updateState = new Subject<IPerson>();
  updatePerson$ = this.updateState.pipe(
    map((personToUpdate) => (vm: IPersonVm) => {
      const indexOfPerson = vm.persons.findIndex((p) => p === personToUpdate);
      // spread operator to maintain immutability of the persons array
      const persons = [
        ...vm.persons.slice(0, indexOfPerson),
        personToUpdate,
        ...vm.persons.slice(indexOfPerson + 1),
      ];
      return { ...vm, persons };
    })
  );

  // sample for update person on server
  public updateStateOnServer = new Subject<IPerson>();
  updatePersonOnServer$ = this.updateStateOnServer.pipe(
    mergeMap((personToUpdate) =>
      this.personService.updateOnServer(personToUpdate)
    ),
    map((updatedPerson) => (vm: IPersonVm) => {
      // this time we can not use the object equality,
      // because it will be a new object deserialized
      // from json of update response. In this case
      // I assume a person has an unqiue identifier called **id**
      const indexOfPerson = vm.persons.findIndex(
        (p) => p.id === updatedPerson.id
      );
      const persons = [
        ...vm.persons.slice(0, indexOfPerson),
        updatedPerson,
        ...vm.persons.slice(indexOfPerson + 1),
      ];
      return { ...vm, persons };
    })
  );
} // class
