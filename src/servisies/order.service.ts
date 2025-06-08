import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../classes/Order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order:Order={}

  constructor(public http:HttpClient) { }
  basicUrl:string='https://localhost:7231/api/Order'
C:Order=new Order()
add(O:Order):Observable<number>
{
  let r= this.http.post<number>(this.basicUrl,O)
  console.log("r: ",r);

  return r
}
returnSum(date: string, sum: number): Observable<number> {
 
  return this.http.post<number>( `https://localhost:7231/a?s=${date}&c=${sum}`,null,{} );

}


}
