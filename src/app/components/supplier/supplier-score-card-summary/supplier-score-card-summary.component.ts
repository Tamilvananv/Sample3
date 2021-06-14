import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierDataModel } from '../model/SupplierDataModel';
import { SupplierService } from 'src/app/services/supplier.service';
import { supplierScoreCardSummaryModel } from '../model/supplierScoreCardSummaryModel';
import { isNullOrUndefined } from 'src/app/tools';
import { QualificationScoreCardModel } from '../model/QualificationScoreCardModel';
import { QualificationStatusService } from 'src/app/services/PrequalificationStatusUpdate.service';
import { PRE_QUALIFICATION_SCORE_STATUS_NEEDMOREINFO, PRE_QUALIFICATION_SCORE_STATUS_QUALIFIED, PRE_QUALIFICATION_STATUS_NEEDMOREINFO, PRE_QUALIFICATION_STATUS_QUALIFIED, PRE_QUALIFICATION_STATUS_REJECTED } from 'src/app/services/ApplicationConstants';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-supplier-score-card-summary',
  templateUrl: './supplier-score-card-summary.component.html',
  styleUrls: ['./supplier-score-card-summary.component.scss']
})
export class SupplierScoreCardSummaryComponent implements OnInit {
  type: string;
  message: string;
  supplierPreQualObj: any;
  supplierName: string;
  tradeLicenceNo: string;
  submittedDate: string;
  submissionClassification: string;
  supplierId: string;
  // scoreWeightage: Array<any>;
  langId: string;
  statusDropdown: Array<any>;
  qualStatusDropdown: Array<any>;
  parentCategory: string;
  childCategory: string;
  subCategory: string;
  supplierNote: string;
  supplierScoreCardSummary: any;
  qualStatusDropdownValue: string;
  remarks: string;

  weightageData: any;
  preQualificationScorecardDtlList = [{
    description: null,
    weightage: null,
    givenScore: null,
    applicableScore: null,
    preQualiId: null
  }];
  oldPreQualificationScorecardDtlList: any;
  supplierCategoryDetailsList: any;
  totScore: number;
  totalScore: string;
  qualiStatus: string;
  qualificationScoreCardModel: QualificationScoreCardModel;
  supplierScoreCardObj: any;
  supplierCategoryList: any;
  @Output() qualificationStatus: EventEmitter<any> = new EventEmitter();
  pageTitle: string;
  pageYoffset: number;

  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
 }

  constructor(private procureCacheService: ProcureCacheService, private supplierService: SupplierService,
    private qualiData: QualificationStatusService, private scroll: ViewportScroller) { }

  ngOnInit(): void {
    this.pageTitle = 'supplierScoreCardSummary';
    this.langId = this.procureCacheService.getLangId();
    this.supplierId = this.procureCacheService.getSupId();
    this.totScore = 0;
    this.supplierService.getCategoryDetails(this.supplierId, this.langId).then((data: SupplierDataModel) => {
      if (!isNullOrUndefined(data.data)) {
        this.supplierScoreCardSummary = data.data;

      }

      if (!isNullOrUndefined(this.supplierScoreCardSummary)) {
        this.supplierScoreCardSummary.forEach(scoreCard => {
          scoreCard.supplierName = this.procureCacheService.getSupplierPreQualDetails().supplierNameInEnglish;
          scoreCard.submissionClassification = this.procureCacheService.getSupplierPreQualDetails().submissionClassification;
          scoreCard.tradelicenseno = this.procureCacheService.getSupplierPreQualDetails().tradelicenseno;
          scoreCard.submittedDate = this.procureCacheService.getSupplierPreQualDetails().submittedDate;

          if (scoreCard.score != null) {
            this.setAggregateScore();
          }
          // if(scoreCard.status == "7001") //Qualified {
          // if(scoreCard.status == "7002") //Rejected {
          // if(scoreCard.status == "7003") //Need more info {

          // }
        })
      }
    });


    this.supplierService.getPreQualificationScorecard(this.supplierId).subscribe((preQualificationData: SupplierDataModel) => {
      this.preQualificationScorecardDtlList = preQualificationData.data.prequalificationScoreCardDtlsList;
      console.log(preQualificationData.data);
      this.remarks = preQualificationData.data.remarks;
      //this.qualiStatus=preQualificationData.data.qualificationStatus;
      this.qualStatusDropdownValue = preQualificationData.data.qualificationStatus;;

      this.oldPreQualificationScorecardDtlList = JSON.parse(JSON.stringify(this.preQualificationScorecardDtlList));
      // this.preQualificationScorecardDtlList.forEach(qualData=>{
      //   this.oldPreQualificationScorecardDtlList.push(qualData);
      // })
      // this.oldPreQualificationScorecardDtlList = preQualificationData.data;
      
      // this.oldPreQualificationScorecardDtlList = this.preQualificationScorecardDtlList;

      console.log(this.preQualificationScorecardDtlList);
      console.log(this.oldPreQualificationScorecardDtlList);
      if (!isNullOrUndefined(this.preQualificationScorecardDtlList)) {
        this.preQualificationScorecardDtlList.forEach(data => {
          if (!isNullOrUndefined(data.givenScore)) {
            this.calcTotalOnScoreChange();
          }
        })
      }

    })

    this.supplierService.getScoreCardStatus(this.langId, "7000").subscribe((preQualificationData: SupplierDataModel) => {
      this.statusDropdown = preQualificationData.data;
    })

    this.supplierService.getScoreCardStatus(this.langId, "7010").subscribe((preQualificationData: SupplierDataModel) => {
      this.qualStatusDropdown = preQualificationData.data;
    })
  }

  submitScoreCardDetails() {
    this.supplierCategoryDetailsList = [];
    this.supplierCategoryDetailsList.qualificationStatus = this.qualStatusDropdownValue;
    this.updateQualificationStatus(this.supplierScoreCardSummary);
    this.supplierScoreCardSummary.forEach(data => {
      this.supplierCategoryDetailsList.push(data);
    })

    this.qualiStatus = this.qualStatusDropdownValue;
    this.supplierScoreCardObj = {};
    this.supplierScoreCardObj.preQualificationScorecardDtlList = Object.assign(this.preQualificationScorecardDtlList);
    this.supplierScoreCardObj.qualiStatus = this.qualiStatus;
    this.supplierScoreCardObj.supplierCategoryDetailsList = Object.assign(this.supplierCategoryDetailsList);
    this.supplierScoreCardObj.supplierNote = this.supplierNote;
    this.supplierScoreCardObj.totalScore = this.totalScore;
    this.supplierScoreCardObj.remarks = this.remarks;

    if (!isNullOrUndefined(this.supplierScoreCardObj)) {
      this.supplierService.savePreQualificationScoreCard(this.supplierScoreCardObj, this.supplierId).subscribe((response: SupplierDataModel) => {
        if (isNullOrUndefined(response)) {
          return;
        }
        if (response.status != "OK") {
          this.type = "danger";
          this.message = response.message;
          this.scroll.scrollToPosition([0, 0]);
          return;
        }
        this.type = "success";
        this.message = response.message;
        // this.qualificationStatus.emit(this.qualiStatus);
        // var qualifiedStatus = 0;
        // var rejectedStatus = 0;
        // var needMoreInfoStatus = 0;

        if (!isNullOrUndefined(response.data.supplierCategoryDetailsList)) {
          this.supplierCategoryList = response.data.supplierCategoryDetailsList;
          this.supplierCategoryList.forEach(categoryData => {

            if (categoryData.status == "7001") { //Qualified
              this.qualiStatus = categoryData.status;
              // qualifiedStatus = qualifiedStatus + 1;
            }
            if (categoryData.status == "7002") { //Rejected
              this.qualiStatus = categoryData.status;
              // rejectedStatus = rejectedStatus + 1;
            }
            if (categoryData.status == "7003") { //Need more info
              this.qualiStatus = categoryData.status;
              // needMoreInfoStatus = needMoreInfoStatus + 1;
            }
          })
        }

        // if(qualifiedStatus > 0) {
        //   this.qualifiedStatus = true; //qualified
        //   this.procureCacheService.setQualifiedStatus(this.qualifiedStatus);
        // } else if(qualifiedStatus == 0 && needMoreInfoStatus > 0) {
        //   this.qualifiedStatus = false; //needMoreInfo
        //   this.procureCacheService.setQualifiedStatus(this.qualifiedStatus);
        // } else {
        //   this.qualifiedStatus = false; //rejected
        //   this.procureCacheService.setQualifiedStatus(this.qualifiedStatus);
        // }
        // console.log(qualifiedStatus);
        // console.log(this.qualifiedStatus);
        console.log(this.qualiStatus);
        
        this.qualiData.changeQualiStatus(this.qualiStatus);
        this.procureCacheService.setPrequalificationStatus(this.qualiStatus);
      })
      this.scroll.scrollToPosition([0, 0]);
    }
  }

  calcTotalOnScoreChange() {
    var givenScore = 0;
    var totalScore = 0;
    this.totalScore = "0";
    this.totScore = 0;
    this.preQualificationScorecardDtlList.forEach(score => {
      if (Number(score.givenScore) <= Number(score.applicableScore)) {
        givenScore = Number(score.givenScore);
        totalScore = Number(this.totScore);
        this.totScore = givenScore + totalScore;
      } else {
        console.log(this.oldPreQualificationScorecardDtlList);
        this.oldPreQualificationScorecardDtlList.forEach(scoreData => {
          console.log(scoreData);

          if (Number(scoreData.preQualiId) == Number(score.preQualiId)) {
            score.givenScore = scoreData.givenScore;
            givenScore = Number(scoreData.givenScore);
            totalScore = Number(this.totScore);
            this.totScore = givenScore + totalScore;
          }
        })
        alert("The given score value should be less than applicable score value");
      }
    })
    this.totalScore = this.totScore.toString();
  }

  setAggregateScore() {
    var scoreTotal = 0;
    var total = "0";
    this.supplierScoreCardSummary.forEach(scoreData => {
      scoreTotal = scoreTotal + Number(scoreData.score);
    })
    scoreTotal = scoreTotal / this.supplierScoreCardSummary.length;

    if (this.preQualificationScorecardDtlList) {
      this.preQualificationScorecardDtlList.forEach(data => {
        if (data.preQualiId == "7") {
          data.givenScore = scoreTotal.toString();
          this.calcTotalOnScoreChange()
        }
      })

    }
    console.log(this.preQualificationScorecardDtlList);

  }

  updateQualificationStatus(supplierScoreCardSummary: supplierScoreCardSummaryModel[]) {
    console.log(supplierScoreCardSummary);

    if (this.supplierScoreCardSummary.some((item) => item.status == PRE_QUALIFICATION_SCORE_STATUS_QUALIFIED)) {
      this.qualStatusDropdownValue = PRE_QUALIFICATION_STATUS_QUALIFIED;
    } else if (this.supplierScoreCardSummary.some((item) => item.status == PRE_QUALIFICATION_SCORE_STATUS_NEEDMOREINFO)) {
      this.qualStatusDropdownValue = PRE_QUALIFICATION_STATUS_NEEDMOREINFO;
    } else {
      this.qualStatusDropdownValue = PRE_QUALIFICATION_STATUS_REJECTED;
    }
    console.log(this.qualStatusDropdownValue);
  }

  close(){
    this.type = null;
  }
  
}
