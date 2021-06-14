import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-inner-dashboard',
  templateUrl: './inner-dashboard.component.html',
  styleUrls: ['./inner-dashboard.component.scss']
})
export class InnerDashboardComponent implements OnInit {
  start: NgbDateStruct;
  end: NgbDateStruct;
  constructor() { }

  ngOnInit(): void {
  }

}
