import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../classes/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public http:HttpClient) { }
  basicUrl:string='https://localhost:7231/api/Ctegory'
  // פונקצית מעטפת שמשתמשת בפונקציה מהשרת
get():Observable<Array<Category>>{  
  // פונקציה מהשרת
return this.http.get<Array<Category>>(this.basicUrl)
}
flag:Boolean=true}
