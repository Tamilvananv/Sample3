import { OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact } from '../../../data/contact';
import { ContactService } from '../../../services/contact.service';
import { NgbdSortableHeader, SortEvent } from '../../../services/sortable.directive';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completion-certificate-search',
  templateUrl: './completion-certificate-search.component.html',
  styleUrls: ['./completion-certificate-search.component.scss'],
  providers: [ContactService, DecimalPipe]
})
export class CompletionCertificateSearchComponent implements OnInit {

  countries$: Observable<Contact[]>;
  total$: Observable<number>;
  completionCertificateSearch: any;
  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: ContactService, public procureCacheService: ProcureCacheService,
    public supplierService: SupplierService, public router: Router) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    const langId = this.procureCacheService.getLangId();
    // const userId = this.procureCacheService.getLoginUserID();
    const supplierId = this.procureCacheService.getSupplierId();
    this.supplierService.getCompletionCertificateSearch(langId, supplierId).subscribe((data: SupplierDataModel) => {
      console.log(data);
      this.completionCertificateSearch = data.data.completionList;
      this.masterData = JSON.parse(JSON.stringify(this.completionCertificateSearch));

      if (this.masterData.length > 0) {
        this.recCount = 5;
        this.totalRecordsCount = this.masterData.length;
      }
      if (+this.recCount > 0) {
        this.completionCertificateSearch = this.masterData.slice(0, +this.recCount);
        this.activePage = 1;
      }
    })
  }


  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.completionCertificateSearch = [];

    if (this.activePage == 1) {
      this.completionCertificateSearch = this.masterData.slice(0, this.recCount);
    } else {
      this.completionCertificateSearch = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.completionCertificateSearch);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.completionCertificateSearch = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  onClickCompletionCertificateNumber(cc_ref_no,contractId) {
    this.procureCacheService.setCompletionCertificateRefNo(cc_ref_no,contractId);
    //this.router.navigate(['/milestone-completion-details']);
  }
  
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("completionCertificateSearchTable");
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
