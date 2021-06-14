import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';


export interface ApiResponse{
    // id: number;
    
    
    status: number;
    message: number;
    result: any;
	
}



