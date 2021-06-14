import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rfi-search',
  templateUrl: './rfi-search.component.html',
  styleUrls: ['./rfi-search.component.scss']
})
export class RfiSearchComponent implements OnInit {
  type: string;
  message: string;
  tabName: string;

  constructor() { }

  ngOnInit(): void {
    this.tabName = "tenderDetails";
  }

}
