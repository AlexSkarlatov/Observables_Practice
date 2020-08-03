import { Component, OnInit, OnDestroy } from '@angular/core';

//istep 1 import rxjs
import { interval , Subscription, Observable} from "rxjs";

//learning about oberators
import { map, filter } from "rxjs/operators";

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
    //observable decides how these functions are called
      const customObservable = Observable.create(observer => {
        let count = 0;
          setInterval( () => {
            observer.next(count);
            if( count === 5 ) {
              observer.complete();
            }
            if(count > 3) {
              observer.error(new Error("count is greater than 3"))
            }
            count++;
          }, 1000 );
      });

      // customObservable.pipe(map((data: number) =>{
      //   return 'round:  ' + (data + 1);
      // }));
//fun with operators
//set up the 3 difft handler functions
      this.firstObsSubscription =  customObservable.pipe(map((data: number) =>{
        return 'round:  ' + (data + 1);
      })).subscribe(data => {
        console.log(data);
      },
      e => {
        console.log(e);
        //send it to backend database
        //set alert for User
        alert(e);
      }, () => {
        console.log('completed!');
      }
    );
  }
  ngOnDestroy(): void{
    this.firstObsSubscription.unsubscribe( );

    //legend has it , the obeservable is still emitting data to this day , but no object is subscribed to id
  }

}
