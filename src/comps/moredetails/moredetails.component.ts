import { Component, OnInit } from '@angular/core';
import { PrudactService } from '../../servisies/prudact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, JsonPipe, Location } from '@angular/common';
import { Prudact } from '../../classes/Prudact';
import { DetailsService } from '../../servisies/details.service';
import { Details } from '../../classes/Details';
import { NavComponent } from "../nav/nav.component";
import { ButtonComponent } from '../button/button.component';
@Component({
  selector: 'app-moredetails',
  imports: [CurrencyPipe, ButtonComponent],
  templateUrl: './moredetails.component.html',
  styleUrl: './moredetails.component.css',
  standalone:true

})
export class MoredetailsComponent implements OnInit {
  id: number = 0
  p: Prudact = new Prudact()
  d: Details = new Details()
  pedit: Details = new Details()

  constructor(public AllP: PrudactService, public ar: ActivatedRoute, public l: Location, public allDet: DetailsService, public route: Router) {

  }
  ngOnInit(): void {
    console.log(this.AllP.Allp2);
    this.ar.params.subscribe(
      x => {
        this.id = x['PId'];
        console.log(this.id);
        this.AllP.getById(this.id).subscribe(
          x => {
            this.p = x
            let i = this.allDet.AllDetails.findIndex(x => x.Prod?.prodId == this.id)
            console.log(i + 5);
            if (i != -1) {
              this.p.count = this.allDet.AllDetails[i].qty!
              this.p.oty = this.p.oty! - this.allDet.AllDetails[i].qty!
            }
            console.log(this.p);
          },
          p1 => {
            console.log(this.p);
          }

        )
      }

    )

  }


  deleteC() {
    this.p.count = this.p.count! - 1
    this.p.oty = this.p.oty! + 1
    let index = this.allDet.AllDetails.findIndex(x => x.Prod?.prodId == this.p.prodId)
    let j = this.AllP.Allp2.findIndex(x => x.prodId == this.p.prodId)
    this.AllP.Allp2[j].count! -= 1
    this.AllP.Allp2[j].oty! += 1

    console.log(index);
    this.allDet.AllDetails[index].qty = (this.allDet.AllDetails[index].qty)! - 1
    console.log(this.AllP.Allp2);
    this.Allsum()
  }
  i: any = 0
  //  הוספת מוצר לעגלת הקניות
  AddtoCart() {
    this.d = new Details(undefined, this.p, 1)
           // מחפש את המוצר בעגלת הקניות

    let index = this.allDet.AllDetails.findIndex(x => x.Prod?.prodId == this.p.prodId)
    console.log(index);
  //  אם לא מצא יוצר חדש ומוסיף לעגלה ומעדכן את הכמות
    if (index == -1) {
      this.allDet.AllDetails.push(this.d)
      this.p.oty = this.p.oty! - 1
      this.p.count! += 1
      console.log(this.AllP.Allp2);
      console.log(this.AllP.Allp2);
    }
            //  אם  מצא  מוסיף לכמות
    else {
      this.p.count! += 1;
      this.p.oty! -= 1
      this.allDet.AllDetails[index].qty = (this.allDet.AllDetails[index].qty)! + 1;
      console.log(this.AllP.Allp2);

    }
    // מעדכן את הכמות במוצרים
    let j = this.AllP.Allp2.findIndex(x => x.prodId == this.p.prodId)
    this.AllP.Allp2[j].count! += 1
    this.AllP.Allp2[j].oty! -= 1
    console.log(this.id);
    console.log(this.allDet.AllDetails);
    this.Allsum()
  }
// מעבר לפרטים נוספים
  show() {
    this.route.navigate([`./cart`])
  }
// חזרה אחורה
  back() {
    this.l.back()
  }
  // service מעדכנת את הסכום ואת כמות המוצרים שקנה שנמצא ב

  Allsum() {
    for (let index = 0; index < this.AllP.Allp2.length; index++) {

      this.AllP.sum += this.AllP.Allp2[index].cost! * this.AllP.Allp2[index].count!

    }

  }
}
