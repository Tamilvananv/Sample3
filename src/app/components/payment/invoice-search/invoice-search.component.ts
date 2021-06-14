import { OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../../data/contact';
import { ContactService } from '../../../services/contact.service';
import { NgbdSortableHeader, SortEvent } from '../../../services/sortable.directive';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { SupplierService } from 'src/app/services/supplier.service';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-search',
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.scss'],
  providers: [ContactService, DecimalPipe]
})
export class InvoiceSearchComponent implements OnInit {

  countries$: Observable<Contact[]>;
  total$: Observable<number>;
  langId: string;
  loginObj: any;
  vendorId: string;
  type: string;
  message: string;
  invoiceList: any;
  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public supplierService: SupplierService, public procureCacheService: ProcureCacheService,
    public service: ContactService, private router: Router
  ) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.langId = this.loginObj.langId;
    this.vendorId = this.loginObj.supplierId;

    this.supplierService.getInvoiceSearchDetails(this.langId, this.vendorId).subscribe((data: SupplierDataModel) => {
      console.log(data);
      if(isNullOrUndefined(data.data)) {
        this.type = "error";
        this.message = data.message;
        return;
      }
      this.invoiceList = data.data.invoiceList;
      this.masterData = JSON.parse(JSON.stringify(this.invoiceList));

      if (this.masterData.length > 0) {
        this.recCount = 5;
        this.totalRecordsCount = this.masterData.length;
      }
      if (+this.recCount > 0) {
        this.invoiceList = this.masterData.slice(0, +this.recCount);
        this.activePage = 1;
      }
    })
  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.invoiceList = [];

    if (this.activePage == 1) {
      this.invoiceList = this.masterData.slice(0, this.recCount);
    } else {
      this.invoiceList = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.invoiceList);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.invoiceList = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  onInvoiceNumberClick(invoiceNumber, contractNumber, invoiceId) {
    this.procureCacheService.setInvoiceNumber(invoiceNumber);
    this.procureCacheService.setContractId(contractNumber);
    this.procureCacheService.setInvoiceId(invoiceId);
    this.router.navigate(['/invoice-details']);
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
    table = document.getElementById("invoiceSearchTable");
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
