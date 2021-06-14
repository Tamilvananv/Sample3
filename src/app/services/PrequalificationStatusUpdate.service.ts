import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class QualificationStatusService {

  private qualiStatusSource = new BehaviorSubject(null);
  currentQualiStatus = this.qualiStatusSource.asObservable();

  constructor() { }

  changeQualiStatus(qualiStatus: string) {
    this.qualiStatusSource.next(qualiStatus);
    console.log(this.qualiStatusSource);
    console.log(qualiStatus);
    console.log(this.currentQualiStatus);
    
    
  }

}