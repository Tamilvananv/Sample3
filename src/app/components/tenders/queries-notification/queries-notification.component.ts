import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queries-notification',
  templateUrl: './queries-notification.component.html',
  styleUrls: ['./queries-notification.component.scss']
})
export class QueriesNotificationComponent implements OnInit {

  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;
  queriesNotificationList = [];

  constructor() { }

  ngOnInit(): void {
  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.queriesNotificationList = [];

    if (this.activePage == 1) {
      this.queriesNotificationList = this.masterData.slice(0, this.recCount);
    } else {
      this.queriesNotificationList = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.queriesNotificationList);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.queriesNotificationList = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("queriesNotificationTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

}
