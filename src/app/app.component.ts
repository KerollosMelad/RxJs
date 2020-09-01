import { Component, OnInit } from '@angular/core';
import { of, from, interval, fromEvent, Observable, Subscription, EMPTY, throwError, combineLatest, timer, forkJoin } from 'rxjs';
import { take, map, tap, catchError, withLatestFrom, delay } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RxJs-HandsOn';

  ngOnInit(): void {

    // //#region create observable 
    // let subscription1: Subscription = new Observable(observer => {
    //   observer.next("Apple 1");
    //   observer.next("Apple 2");
    //   observer.next("Apple 3");
    //   observer.complete();
    // }).subscribe(
    //   element => console.log(element),
    //   err => console.log(err),
    //   () => console.log("completed..."));

    // let subscription2 = of(9, 8, 7, 6, 5).subscribe(console.log);    // next, error, and complete are optional parameters 

    // let subscription3 = from([9, 8, 7, 6, 5]).subscribe(
    //   element => console.log(element),
    //   err => console.log(err),
    //   () => console.log("completed..."));

    // let subscription4 = of([9, 8, 7, 6, 5]).subscribe(console.log); // emit only one element => emit the array as one element 

    // let subscription5 = interval(100).subscribe(console.log);     // async, emit incremental numbers with 100 ms interval between them 
    // setTimeout(() => subscription5.unsubscribe(), 400);           // emit forever till unsubscribe, or stop emitting the observable stream by any other way

    // // fromEvent(element, eventName).subscribe()
    // //#endregion

    // //#region some RxJs operators 
    // console.log(".................... operators ..................");
    // of(2, 4, 6, 8, 10)
    //   .pipe(
    //     take(2),
    //     take(3),                                                // multiple take will choose the smallest one 
    //     tap((item) => console.log(`emitted item before map: ${item}`)),
    //     map(item => item * 2),
    //     tap((item) => console.log(`emitted item after map: ${item}`)),
    //   )
    //   .subscribe(
    //     element => console.log(`next: ${element}`),
    //     err => console.log(err),
    //     () => console.log("operators completed..."));

    // console.log(".................... CatchError ..................");
    // of(2, 4, 6, 8, 10)
    //   .pipe(
    //     map(item => {
    //       if (item === 2)
    //         throw new Error("elemet is 2.");
    //     }),
    //   )
    //   .pipe(
    //     tap(console.log),                                                           // wil not call cuz no element is emitted 
    //     catchError(err => {
    //       console.log(`inside the catche error ${err}`);
    //       //return EMPTY;                                                           // catch and replace, 
    //       //  so the complete method will be called, 
    //       //  but the error method will not

    //       return throwError("an error is occurred.");                                  // catch and rethrow =>
    //       // the complete method wil not be called
    //       // but the error method will                                                                           
    //     }),
    //   )
    //   .subscribe(
    //     element => console.log(`next: ${element}`),
    //     err => console.log(err),
    //     () => console.log("operators completed..."));
    // //#endregion



    //#region combine the streams
    // console.log("...............................combine........................")
    // let stream1$ = interval(100);
    // let stream2$ = of('A', 'B', 'C', 'D', 'E', 'F', 'G');

    // let stream1WithStream2$ = combineLatest([stream1$, stream2$])
    //   .pipe(tap(item => console.log(JSON.stringify(item))))

    // stream1WithStream2$.subscribe();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

    // const timerOne$ = timer(1000, 4000);
    // const timerTwo$ = timer(2000, 4000);
    // const timerThree$ = timer(3000, 4000);

    // combineLatest(
    //   timerOne$,
    //   timerTwo$,
    //   timerThree$,
    //   // combineLatest also takes an optional projection function
    //   (one, two, three) => {
    //     return `Timer One (Proj) Latest: ${one}, 
    //             Timer Two (Proj) Latest: ${two}, 
    //             Timer Three (Proj) Latest: ${three}`;
    //   }
    // ).subscribe(console.log);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // //emit every 5s
    // const source = interval(5000);
    // //emit every 1s
    // const secondSource = interval(1000);
    // const withLatest = source.pipe(
    //   withLatestFrom(secondSource),
    //   map(([first, second]) => {
    //     return `First Source (5s): ${first} Second Source (1s): ${second}`;
    //   })
    // );
    // /*
    //   "First Source (5s): 0 Second Source (1s): 4"
    //   "First Source (5s): 1 Second Source (1s): 9"
    //   "First Source (5s): 2 Second Source (1s): 14"
    //   ...
    // */
    // const subscribeWithLatest = withLatest.subscribe(val => console.log(val));

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const myPromise = val =>
      new Promise(resolve => setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
      );

    /*
      when all observables complete, give the last
      emitted value from each as an array
    */
    const forkJoinExample = forkJoin(
      //emit 'Hello' immediately
      of('Hello'),
      //emit 'World' after 1 second
      of('World').pipe(delay(1000)),
      //emit 0 after 1 second
      interval(1000).pipe(take(1)),
      //emit 0...1 in 1 second interval
      interval(1000).pipe(take(2)),
      //promise that resolves to 'Promise Resolved' after 5 seconds
      myPromise('RESULT')
    );
    //output: ["Hello", "World", 0, 1, "Promise Resolved: RESULT"]
    const subscribe = forkJoinExample.subscribe(val => console.log(val));

    //#endregion



  }
}
