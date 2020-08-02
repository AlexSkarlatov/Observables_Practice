import { Component, OnInit, OnDestroy } from '@angular/core';

//istep 1 import rxjs
import { interval , Subscription, Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  private subscriptionObject: Subscription;


  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription =   interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    //know that to create an observable object it must have as a field a defiened observer
    //method to share to its subscribers
      const customObservable = Observable.create(observer => {
        let count = 0;
          setInterval( () => {
            observer.next(count);
            if( count === 2 ) {
              observer.complete();
            }
            if(count > 3) {
              observer.error(new Error("count is greater than 3"))
            }
            count++;
          }, 1000 );
      });

      this.firstObsSubscription =  customObservable.subscribe(data => {
        console.log(data);
      },
      e => {
        console.log(e);
        //send it to backend database
        //set alert for User
        alert(e);
      }
    );
  }
  ngOnDestroy(): void{
    this.firstObsSubscription.unsubscribe( );

    //legend has it , the obeservable is still emitting data to this day , but no object is subscribed to id
  }

}
