
import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { LovMaster } from './LovMaster';


export interface SupplierInformationDropdownList {
    // id: number;
    typeOfOwnership : LovMaster[];
	qualificationAreaLevel : LovMaster[];
	experienceHistory  : LovMaster[];
	currentAndPreProjects : LovMaster[];
	totalAssetsAndLiabilities : LovMaster[];
	attachmentSectionDocCategory : LovMaster[];
}



