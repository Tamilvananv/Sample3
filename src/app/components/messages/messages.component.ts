import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: null,
  message: null
}];

// const ALERTS: Alert[] = [{
//   type: 'success',
//   message: 'This is an success alert',
// }, {
//   type: 'info',
//   message: 'This is an info alert',
// }, {
//   type: 'warning',
//   message: 'This is a warning alert',
// }, {
//   type: 'danger',
//   message: 'This is a danger alert',
// }, {
//   type: 'primary',
//   message: 'This is a primary alert',
// }, {
//   type: 'secondary',
//   message: 'This is a secondary alert',
// }, {
//   type: 'light',
//   message: 'This is a light alert',
// }, {
//   type: 'dark',
//   message: 'This is a dark alert',
// }
// ];

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit,OnChanges {

  @Input() type:string;

  @Input() message: string;

  alerts: Alert[];

  constructor() { 
    this.reset();
  }

  ngOnInit(): void {
    ALERTS[0].type =this.type;
    ALERTS[0].message = this.message;
    // console.log(this.alerts);
    // console.log(this.type);
    // console.log(this.message);

  }

  close(alert: Alert) {
  //  console.log(alert);
  //  console.log(this.alerts)
    this.alerts.splice(this.alerts.indexOf(alert), 1);
    // console.log(this.alerts)

  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }


  
  ngOnChanges(changes: SimpleChanges) {
    console.log('in ngOnChanges'+changes);
    if (changes.test && !changes.test.isFirstChange()) {
      // exteranl API call or more preprocessing...
    }

    this.type = undefined;
    for (let propName in changes) {
      let change = changes[propName];
      if(change.isFirstChange()) {
        // console.log(`first change: ${propName}`);
      } else {
        if(this.type == undefined) {
          this.type = change.currentValue;
          console.log(this.type);
          ALERTS[0].type =this.type;

        } else {
          this.message = change.currentValue;
          console.log(this.message);
          ALERTS[0].message = this.message;

        }
        // console.log(`prev: ${change.previousValue}, cur: ${change.currentValue}`);
        console.log(ALERTS);
        
      }

    }
  }
}
