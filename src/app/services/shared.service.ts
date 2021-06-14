import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public menuDataCallback = new Subject<any>();

  menuList: any;

  constructor(private http: HttpClient) { }

  setMenuCallback(value) {
    this.menuDataCallback.next(value);
    this.menuList = value;
  }
}
