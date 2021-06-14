import { Component, Input, OnInit } from '@angular/core';
import { PostQueriesNotification } from 'src/app/services/PostQueriesNotification';

@Component({
  selector: 'app-queries-detail',
  templateUrl: './queries-detail.component.html',
  styleUrls: ['./queries-detail.component.scss']
})
export class QueriesDetailComponent implements OnInit {
 @Input() postQueriesTenderDtls:PostQueriesNotification;
  constructor() { }

  ngOnInit(): void {
  }

}
