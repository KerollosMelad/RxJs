import { Component, OnInit } from '@angular/core';
import { of, from, interval, fromEvent, Observable, Subscription } from 'rxjs';
import { take, map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RxJs-HandsOn';

  ngOnInit(): void {

    //#region  create observable 
    let subscription1: Subscription = new Observable(observer => {
      observer.next("Apple 1");
      observer.next("Apple 2");
      observer.next("Apple 3");
      observer.complete();
    }).subscribe(
      element => console.log(element),
      err => console.log(err),
      () => console.log("completed..."));

    let subscription2 = of(9, 8, 7, 6, 5).subscribe(console.log);    // next, error, and complete are optional parameters 

    let subscription3 = from([9, 8, 7, 6, 5]).subscribe(
      element => console.log(element),
      err => console.log(err),
      () => console.log("completed..."));

    let subscription4 = of([9, 8, 7, 6, 5]).subscribe(console.log); // emit only one element => emit the array as one element 

    let subscription5 = interval(100).subscribe(console.log);     // async, emit incremental numbers with 100 ms interval between them 
    setTimeout(() => subscription5.unsubscribe(), 400);           // emit forever till unsubscribe, or stop emitting the observable stream by any other way

    // fromEvent(element, eventName).subscribe()
    //#endregion

    //#region some RxJs operators 
    console.log(".................... operators ..................");
    of(2, 4, 6, 8, 10)
      .pipe(
        take(2),
        take(3),                                                // multiple take will choose the smallest one 
        tap((item) => console.log(`emitted item before map: ${item}`)),
        map(item => item * 2),
        tap((item) => console.log(`emitted item after map: ${item}`)),
      )
      .subscribe(
        element => console.log(`next: ${element}`),
        err => console.log(err),
        () => console.log("operators completed..."));
    //#endregion

  }



}
