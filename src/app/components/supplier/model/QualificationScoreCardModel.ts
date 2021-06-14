export class QualificationScoreCardModel {
    preQualificationScorecardDtlList: [
        {
            applicableScore: string,
            description: string,
            givenScore: string,
            preQualiId: string,
            supplierId: string,
            weightage: string
        }
    ];
    qualiStatus: string;
    supplierCategoryDetailsList: [
        {
            categoryId: string,
            childCategory: string,
            childCategory1: string,
            compId: string,
            deleteFlag: string,
            //  langId :  string ,
            note: string,
            parentCategory: string,
            qualificationStatus: string,
            score: string,
            status: string,
            subCategory: string,
            //   supplierId :  string ,
            //  userId :  string 
        }
    ];
    supplierNote: string;
    totalScore: string;
}