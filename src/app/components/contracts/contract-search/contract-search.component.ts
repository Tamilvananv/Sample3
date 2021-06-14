import { OnInit } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import {Contract} from '../../../data/contract';
import {ContactService} from '../../../services/contract.service';
import {NgbdSortableHeader, SortEvent} from '../../../services/sortable.directive';
import { SupplierService } from 'src/app/services/supplier.service';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contract-search',
  templateUrl: './contract-search.component.html',
  styleUrls: ['./contract-search.component.scss'],
  providers: [ContactService, DecimalPipe]
})
export class ContractSearchComponent implements OnInit {

  countries$: Observable<Contract[]>;
  total$: Observable<number>;
  loginObj: any;
  supplierId: string;
  loginUserID: string;
  langId: string;
  awardedContractsList: Array<any>;
  contractId: string;
  allAwardedContractList: Array<any>;
  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: ContactService,private supplierService: SupplierService,
    private procureCacheService: ProcureCacheService,private router: Router) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.langId = this.loginObj.langId;
    this.supplierService.getContractSearchDetails(this.langId,this.supplierId).subscribe((response:SupplierDataModel)=> {
      console.log(response);
      this.awardedContractsList = response.data.awardedContractsList;

      this.masterData = JSON.parse(JSON.stringify(this.awardedContractsList));

      if (this.masterData.length > 0) {
        this.recCount = 5;
        this.totalRecordsCount = this.masterData.length;
      }
      if (+this.recCount > 0) {
        this.awardedContractsList = this.masterData.slice(0, +this.recCount);
        this.activePage = 1;
      }

      this.allAwardedContractList = response.data.awardedContractsList;
      console.log(this.awardedContractsList);
    });
  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.awardedContractsList = [];

    if (this.activePage == 1) {
      this.awardedContractsList = this.masterData.slice(0, this.recCount);
    } else {
      this.awardedContractsList = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.awardedContractsList);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.awardedContractsList = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  getContractDetails(contractList) {
    console.log(contractList);
    this.contractId = contractList.contractId;
    this.procureCacheService.setContractId(this.contractId);
    this.router.navigate(['/contract-information'])
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

  applyFilter(filterValue: string) {
    console.log(filterValue);
    
    if(filterValue === '' ) {
        return this.awardedContractsList=this.allAwardedContractList;
    } 
    else {
      // let filterValueLower = filterValue;
      return this.awardedContractsList = this.allAwardedContractList.filter((contractList) => contractList.contractNumber.includes(filterValue) || contractList.contractDesc.includes(filterValue) ||
      contractList.revisonNo.includes(filterValue) || contractList.contractMainType.includes(filterValue) ||
      contractList.agency.includes(filterValue) || contractList.status.includes(filterValue))
    }
 }

 
 sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("contractSearchTable");
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
