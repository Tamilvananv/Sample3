import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rfi',
  templateUrl: './rfi.component.html',
  styleUrls: ['./rfi.component.scss']
})
export class RfiComponent implements OnInit {
  type: string;
  message: string;
  constructor() { }

  ngOnInit(): void {
  }

}
