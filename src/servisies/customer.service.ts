import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../classes/Customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http:HttpClient) { }
  basicUrl:string='https://localhost:7231/api/Customer'
  //   משתנים ציבוריים שכל בנאי שיקבל משתנה מהסרוויס הזה יוכל לגשת למשתנים 
  newCust:Customer={}
  flag:boolean=false
    // פונקצית מעטפת שמשתמשת בפונקציה מהשרת
get():Observable<Array<Customer>>{
  console.log('kj');
  // פונקציה מהשרת
return this.http.get<Array<Customer>>(this.basicUrl)

}
  // פונקצית מעטפת שמשתמשת בפונקציה מהשרת
getById(cusId:string):Observable<Customer>{ 
  // פונקציה מהשרת
  return this.http.get<Customer>('https://localhost:7231/api/Customer/'+cusId)
  }
  // פונקצית מעטפת שמשתמשת בפונקציה מהשרת
add(C:Customer):Observable<boolean>
{
  // פונקציה מהשרת

     return this.http.post<boolean>(this.basicUrl,C)
}

}