import { Injectable } from '@angular/core';
import { Subject, Observable, merge, of } from 'rxjs';
import { map, scan } from 'rxjs/operators';

interface CounterVm {
  counter: number;
}

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  public vm$: Observable<CounterVm>;

  public incrState = new Subject<number>();
  public decrState = new Subject<number>();

  constructor() {
    const incr$ = this.incrState.pipe(
      //   viewmodel mutation function
      //   take the delta and apply it immutable to the viewmodel
      map((delta) => (vm: CounterVm) => ({
        ...vm,
        counter: vm.counter + delta,
      }))
    );
    const decr$ = this.decrState.pipe(
      map((delta) => (vm: CounterVm) => ({
        ...vm,
        counter: vm.counter - delta,
      }))
    );
    // merge all state functions and use scan as a reducer function which takes the previous vm and a mutation function
    // and applies the mutation function on the previous vm
    this.vm$ = merge(of({ counter: 0 }), incr$, decr$).pipe(
      scan((prevVm: CounterVm, mutationFn: (vm: CounterVm) => CounterVm) =>
        mutationFn(prevVm)
      )
    );
  } // constructor
} // class
