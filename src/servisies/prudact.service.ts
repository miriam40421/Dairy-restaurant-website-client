import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prudact } from '../classes/Prudact';
@Injectable({
  providedIn: 'root'
})
export class PrudactService {

  constructor(public http:HttpClient) { }
  basicUrl:string='https://localhost:7231/api/Prudact'
    // פונקציות מעטפת שמשתמשת בפונקציות מהשרת

gett():Observable<Array<Prudact>>{  
  console.log(this.http.get<Array<Prudact>>(this.basicUrl));
  
return this.http.get<Array<Prudact>>(this.basicUrl)

}
getTop():Observable<Array<Prudact>>{  
  console.log(this.http.get<Array<Prudact>>(this.basicUrl));
  
return this.http.get<Array<Prudact>>('https://localhost:7231/api/Prudact/top')

}

getById(id:Number):Observable<Prudact>{  
  return this.http.get<Prudact>('https://localhost:7231/api/Prudact/'+id)
  }
getByCategory(catid:Number,cost:Number):Observable<Array<Prudact>>{  
  return this.http.get<Array<Prudact>>('https://localhost:7231/api/Prudact/ByName'
)
  }


    filter(catId?: number, cost?: number):Observable<Array<Prudact>>{
      let params = new HttpParams();
      if (catId!== undefined && catId !== null) {
        params = params.set("CatId", catId);
      }
      if (cost !== undefined && cost !== null) {
        params = params.set("cost", cost.toString());
      }

      return this.http.get<Array<Prudact>>(this.basicUrl+"/ByName", { params })
  }
     
    //   משתנים ציבוריים שכל בנאי שיקבל משתנה מהסרוויס הזה יוכל לגשת למשתנים     
Allp2:Array<Prudact>=new Array<Prudact>();
sum:number=0
sum1:number=0


Currentpru:Prudact=new Prudact();

}
