import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../servisies/category.service';
import { Category } from '../../classes/Category';
import { PrudactService } from '../../servisies/prudact.service';
import { Route, Router, RouterOutlet } from '@angular/router';
import { Prudact } from '../../classes/Prudact';
import { DetailsService } from '../../servisies/details.service';
import { Details } from '../../classes/Details';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ColorDirective } from '../../Directive/color.directive';
import { NavComponent } from "../nav/nav.component";
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-category',
  imports: [RouterOutlet, CommonModule, ColorDirective, FormsModule, CurrencyPipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  standalone: true
})
export class CategoryComponent implements OnInit {
  cost: number | undefined
  catId: number | undefined
  constructor(public allCat: CategoryService, public Allpruc: PrudactService, public allDet: DetailsService, public route: Router) { }
  ngOnInit(): void {
    console.log(this.Allpruc.Allp2);
    this.getTop()
    this.Allsum()
  }

  AllCategory: Array<Category> = new Array<Category>();
  chosenMod: string = "";
// בחירה לפי מה למיין
  modo() {
    switch (this.chosenMod) {
      case "mod1": {
        this.sortbycatname()
        break;
      }
      case "mod2": {
        this.sortbydate()
        break;
      }
      case "mod3": {
        this.sortbycost()
        break;
      }
    }
  }
  getTop() {
    console.log(this.Allpruc.Allp2);

       // קבלת כל הקטגוריות 
    this.allCat.get().subscribe(
      p => {

        this.AllCategory = p
        console.log("p:" + this.AllCategory);

      },
      err => {
        console.log(err.messege);
      }

    )
  //  קבלת  10מוצרים ראשונים
    this.Allpruc.getTop().subscribe(
      p => {
        this.Allpruc.Allp2 = p;
        // עדכון כמות המוצרים לפי הכמות שבעגלת הקניות
        if (this.allDet.AllDetails.length > 0) {
          for (let index = 0; index < this.Allpruc.Allp2.length; index++) {
            let i = this.allDet.AllDetails.findIndex(x => x.Prod?.prodId == this.Allpruc.Allp2[index].prodId)
            if (i != -1) {
              this.Allpruc.Allp2[index].count = this.allDet.AllDetails[i].qty
              this.Allpruc.Allp2[index].oty = this.Allpruc.Allp2[index].oty! - this.allDet.AllDetails[i].qty!
            }
          }
        }
      },
      err => {
        console.log(err.messege);
      }

    )
    this.allDet.AllDetails = this.allDet.AllDetails
  }


  get() {
    console.log(this.Allpruc.Allp2);
    console.log(this.allDet.AllDetails);
    this.cost = undefined
    this.catId = undefined
    // קבלת כל המוצרים
    this.Allpruc.gett().subscribe(
      p => {
        this.Allpruc.Allp2 = p;
                // עדכון כמות המוצרים לפי הכמות שבעגלת הקניות
        if (this.allDet.AllDetails.length > 0) {
          for (let index = 0; index < this.Allpruc.Allp2.length; index++) {
            let i = this.allDet.AllDetails.findIndex(x => x.Prod?.prodId == this.Allpruc.Allp2[index].prodId)
            if (i != -1) {
              this.Allpruc.Allp2[index].count = this.allDet.AllDetails[i].qty
              this.Allpruc.Allp2[index].oty = this.Allpruc.Allp2[index].oty! - this.allDet.AllDetails[i].qty!
            }
          }
        }
      },
      err => {
        console.log(err.messege);
      }

    )

  }
//c הלוקאלי למשתנה  catId עדכון משתנה ה
  sortC(c: number) {
    this.catId = c

    this.getByCategory()
  }
// מבצע סינון לפי מחיר וקטגוריה לפי מה שהכניס 
  getByCategory() {
    console.log(this.Allpruc.Allp2);
    this.Allpruc.filter(this.catId, this.cost).subscribe(
      p => {
        console.log("p:" + p);
        this.Allpruc.Allp2 = p
                        // עדכון כמות המוצרים לפי הכמות שבעגלת הקניות
        for (let index = 0; index < this.Allpruc.Allp2.length; index++) {
          let i = this.allDet.AllDetails.findIndex(x => x.Prod?.prodId == this.Allpruc.Allp2[index].prodId)
          if (i != -1) {
            this.Allpruc.Allp2[index].count = this.allDet.AllDetails[i].qty
            this.Allpruc.Allp2[index].oty = this.Allpruc.Allp2[index].oty! - this.allDet.AllDetails[i].qty!
          }
        }
        console.log(this.catId, this.cost);
      },
      err => {
        console.log(err.messege);
      }
    )
  }
// מעבר לדף פרטים נוספים
  more(PId: number) {
    let p = this.Allpruc.Allp2.find(x => x.prodId == PId)
    if (p)
      this.route.navigate([`./details/${PId}`])
  }
  p: Details = new Details()
  //  הוספת מוצר לעגלת הקניות
  AddtoCart(prod: Prudact) {
    let j = this.Allpruc.Allp2.findIndex(x => x.prodId == prod.prodId)
       // מחפש את המוצר בעגלת הקניות
    let index = this.allDet.AllDetails.findIndex(x => x.Prod?.prodId == prod.prodId)
  //  אם לא מצא יוצר חדש ומוסיף לעגלה ומעדכן את הכמות
    if (index == -1) {
      this.p = new Details(undefined, prod, 1)
      this.allDet.AllDetails.push(this.p)
      this.Allpruc.Allp2[j].oty = this.Allpruc.Allp2[j].oty! - 1
      this.Allpruc.Allp2[j].count = this.Allpruc.Allp2[j].count! + 1
      this.Allpruc.sum += this.Allpruc.Allp2[j].cost!
    }
    else {
        //  אם  מצא  מוסיף לכמות

      this.allDet.AllDetails[index].qty = (this.allDet.AllDetails[index].qty)! + 1;
      this.Allpruc.Allp2[j].oty = this.Allpruc.Allp2[j].oty! - 1
      this.Allpruc.Allp2[j].count! += 1;
      this.Allpruc.sum += this.Allpruc.Allp2[j].cost!

    }

    console.log(this.allDet.AllDetails);
    this.Allsum()
  }
  // מעבר לעגלת הקניות
  show() {
    this.route.navigate([`./cart`])
  }
// מיון לפי מחיר
  public sortbycost(): void {

    this.Allpruc.Allp2 = this.Allpruc.Allp2.sort((a: any, b: any) => a.cost - b.cost);

  }
  // מיון לפי תאריך עדכון אחרון
  public sortbydate(): void {
    this.Allpruc.Allp2 = this.Allpruc.Allp2.sort((a: any, b: any) => {
      return new Date(a.lastDateUpdate).getTime() - new Date(b.lastDateUpdate).getTime();
    });
  }
  // מיון לפי קטגוריה
  public sortbycatname(): void {
    this.Allpruc.Allp2 = this.Allpruc.Allp2.sort((a: Prudact, b: Prudact) =>
      a.catName!.localeCompare(b.catName!));
  }
  // מחיקת כמות מוצר מהעגלה
  deleteC(prod: Prudact) {
    let j = this.Allpruc.Allp2.findIndex(x => x.prodId == prod.prodId)
    let index = this.allDet.AllDetails.findIndex(x => x.Prod == prod)
  //  אם המוצר לא נמצא בעגלת הקניות
    if (index == -1) {
      // מעדכן את הכמות במוצרים
      this.Allpruc.Allp2[j].oty = this.Allpruc.Allp2[j].oty! + 1
      this.Allpruc.Allp2[j].count = this.Allpruc.Allp2[j].count! - 1
    }
    else {
      // אם המוצר נמצא בעגלת הקניות מעדכן גם במוצרים וגם בעגלת הקניות
      this.allDet.AllDetails[index].qty = (this.allDet.AllDetails[index].qty)! - 1;
      this.Allpruc.Allp2[j].oty = this.Allpruc.Allp2[j].oty! + 1
      this.Allpruc.Allp2[j].count! -= 1;
    }

    console.log(this.allDet.AllDetails);
    this.Allsum()
  }
                // service מעדכנת את הסכום ואת כמות המוצרים שקנה שנמצא ב
  Allsum() {
    this.Allpruc.sum = 0
    this.Allpruc.sum1 = 0
    for (let index = 0; index < this.allDet.AllDetails.length; index++) {
      this.Allpruc.sum += this.allDet.AllDetails[index].Prod?.cost! * this.allDet.AllDetails[index].Prod?.count!
      this.Allpruc.sum1 += this.allDet.AllDetails[index].Prod?.count!

    }
  }

}
