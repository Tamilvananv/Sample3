import { Component, Input, OnInit } from '@angular/core';
import { PostQueriesNotification } from 'src/app/services/PostQueriesNotification';

@Component({
  selector: 'app-queries-submitted',
  templateUrl: './queries-submitted.component.html',
  styleUrls: ['./queries-submitted.component.scss']
})
export class QueriesSubmittedComponent implements OnInit {
 
  @Input()postQueriesNotificationList:PostQueriesNotification[];
  constructor() { }

  ngOnInit(): void {
  }

}
