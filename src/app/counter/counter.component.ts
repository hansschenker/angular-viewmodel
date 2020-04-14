import { Component, OnInit } from '@angular/core';
import { Subject, Observable, merge, of } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { CounterService } from './counter.service';

// interface CounterVm {
//   counter:number;
// }

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit {
  vm$;
  incr$;
  decr$;

  constructor(svc: CounterService) {
    this.vm$ = svc.vm$;
    this.incr$ = svc.incrState;
    this.decr$ = svc.decrState;
  }

  // public vm$ : Observable<CounterVm>;
  // // normally it could be done with a single subject, but for demonstration
  // // purposes, I'll use 2 subjects
  // public incrSubj = new Subject<number>();
  // public decrSubj = new Subject<number>();

  //   constructor() {
  // // the subjects are mapped to an anonymous function that
  //   // - accepts as parameter the previous state of the viewmodel (vm:ICounterVm)
  //   // - and that returns the mutated viewmodel
  //   // they are the viewmodel mutation functions
  //   const incr$ = this.incrSubj.pipe(
  //     map( delta => (vm:CounterVm) => ({...vm, counter:vm.counter+delta}) )
  //   );
  //   const decr$ = this.decrSubj.pipe(
  //     map( delta => (vm:CounterVm) => ({...vm, counter:vm.counter-delta}))
  //   );

  //   this.vm$ = merge(of({counter:0}), incr$, decr$).pipe(
  //     scan( (prevVm:CounterVm, mutationFn:(vm:CounterVm) => CounterVm)  => mutationFn(prevVm)
  //     )
  //   )
  //   } // constructor

  ngOnInit(): void {}
}
