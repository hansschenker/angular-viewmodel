import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PersonService } from '../person.service';
import { IPersonVm } from '../persons-list/persons-list.component';
import { merge, Subject } from 'rxjs';

@Component({
  selector: 'person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
})
export class PersonDetailsComponent {
  vm$;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) {
    const retrieveData$ = route.paramMap.pipe(
      map((paramMap) => +paramMap.get('id')),
      switchMap((id) => this.personService.getPerson(id)),
      map((personDetail) => (vm: IPersonVm) => ({ ...vm, personDetail }))
    );
    this.vm$ = merge(retrieveData$ /* other viewmodel mutations */);
  } // constructor

  sideEffectSubj = new Subject();
  sideEffect$ = this.sideEffectSubj.pipe(
    map((_) => (vm: IPersonVm) => {
      // execute side effect here
      return vm;
    })
  );
} // class
