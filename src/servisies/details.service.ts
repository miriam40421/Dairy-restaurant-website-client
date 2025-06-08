import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Details } from '../classes/Details';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(public http:HttpClient) { }
//   משתנים ציבוריים שכל בנאי שיקבל משתנה מהסרוויס הזה יוכל לגשת למשתנים 
AllDetails:Array<Details>=new Array<Details>();
flag:boolean=false

}
