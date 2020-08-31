import { Component, OnInit } from '@angular/core';
import { of, from, interval, fromEvent, Observable, Subscription } from 'rxjs';

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
    setTimeout(() => subscription5.unsubscribe(), 400);           // emit forever till unsubscribe

    // fromEvent(element, eventName).subscribe()
    //#endregion
  }



}
