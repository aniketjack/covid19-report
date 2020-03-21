import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaitingLoaderService {

  constructor() { }

  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

   display(value: boolean){
      this.status.next(value);
   }
}