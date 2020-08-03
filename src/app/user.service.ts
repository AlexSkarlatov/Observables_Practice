import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
//fun with subjects
@Injectable({
  providedIn: 'root'
})
export class UserService {
  activatedEmitter = new Subject<boolean>();
}
