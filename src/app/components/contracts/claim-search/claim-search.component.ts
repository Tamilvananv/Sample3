import { OnInit } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import {Contact} from '../../../data/contact';
import {ContactService} from '../../../services/contact.service';
// import {NgbdSortableHeader, SortEvent} from '../../../services/sortable.directive';
import { SupplierService } from 'src/app/services/supplier.service';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { Claim } from 'src/app/services/Claim';

@Component({
  selector: 'app-claim-search',
  templateUrl: './claim-search.component.html',
  styleUrls: ['./claim-search.component.scss'],
  providers: [ContactService, DecimalPipe]
})
export class ClaimSearchComponent implements OnInit {

  countries$: Observable<Contact[]>;
  total$: Observable<number>;
  claimSearchDetails: any;
  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;

  // @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: ContactService, public supplierService: SupplierService, 
    private procureCacheService: ProcureCacheService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    const supplierId = this.procureCacheService.getSupplierId();
    this.supplierService.getClaimSearchDetails(supplierId).subscribe(data =>{
      console.log(data);
      this.claimSearchDetails = data.data.claimList;
      this.masterData = JSON.parse(JSON.stringify(data.data.claimList));

      if (this.masterData.length > 0) {
        this.recCount = 5;
        this.totalRecordsCount = this.masterData.length;
      }
      if (+this.recCount > 0) {
        this.claimSearchDetails = this.masterData.slice(0, +this.recCount);
        this.activePage = 1;
      }
    })
  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.claimSearchDetails = [];

    if (this.activePage == 1) {
      this.claimSearchDetails = this.masterData.slice(0, this.recCount);
    } else {
      this.claimSearchDetails = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.claimSearchDetails);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.claimSearchDetails = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  // onSort({column, direction}: SortEvent) {
  //   // resetting other headers
  //   this.headers.forEach(header => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });

  //   this.service.sortColumn = column;
  //   this.service.sortDirection = direction;
  // }

  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("claimSearchTable");
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

  getClaimDetails(claimsDetails:Claim){
    this.procureCacheService.setClaimId(claimsDetails.claimId);
    this.procureCacheService.setContractId(claimsDetails.contractNumber);    
  }
}
