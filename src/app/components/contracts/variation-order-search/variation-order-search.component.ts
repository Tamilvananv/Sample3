import { OnInit } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import {Contact} from '../../../data/contact';
import {ContactService} from '../../../services/contact.service';
import {NgbdSortableHeader, SortEvent} from '../../../services/sortable.directive';
import { HttpClient } from '@angular/common/http';
import { SupplierService } from 'src/app/services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { VariationOrderDtl } from 'src/app/services/VariationOrderDtl';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-variation-order-search',
  templateUrl: './variation-order-search.component.html',
  styleUrls: ['./variation-order-search.component.scss'],
  providers: [ContactService, DecimalPipe]
})
export class VariationOrderSearchComponent implements OnInit {
  countries$: Observable<Contact[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  isAlreadySaved: boolean;
  variationOrderSearchList: VariationOrderDtl[];
  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;

  constructor(public service: ContactService,public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.isAlreadySaved = false;

    this.supplierService.getVariationOrderSearchAll(this.supplierId).subscribe((data: SupplierDataModel) => {
      this.variationOrderSearchList = data.data.variationOrderList;     

      this.masterData = JSON.parse(JSON.stringify(this.variationOrderSearchList));

      if (this.masterData.length > 0) {
        this.recCount = 5;
        this.totalRecordsCount = this.masterData.length;
      }
      if (+this.recCount > 0) {
        this.variationOrderSearchList = this.masterData.slice(0, +this.recCount);
        this.activePage = 1;
      }
    })

  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.variationOrderSearchList = [];

    if (this.activePage == 1) {
      this.variationOrderSearchList = this.masterData.slice(0, this.recCount);
    } else {
      this.variationOrderSearchList = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.variationOrderSearchList);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.variationOrderSearchList = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  /* getVariationOrderDetails(voId,contractId) {
    console.log('void::'+voId);   
    this.procureCacheService.setVariationOrderId(voId);
    this.procureCacheService.setContractId(contractId);
  } */
  getVariationOrderDetails(voDtl:VariationOrderDtl) {
    console.log('void::'+voDtl.variationOrderId);   
    this.procureCacheService.setVariationOrderId(voDtl.variationOrderId);
    this.procureCacheService.setContractId(voDtl.contractNumber);
    this.procureCacheService.setVariationOrderDtl(voDtl);
  }
  onSort({column, direction}: SortEvent) {
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
    table = document.getElementById("variationOrderSearchTable");
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
