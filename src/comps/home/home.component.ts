import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { Route, Router, RouterOutlet } from '@angular/router';
import { CustomerService } from '../../servisies/customer.service';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone:true

})
export class HomeComponent implements OnInit {

  constructor(public AllCus: CustomerService, public route: Router) { }

  ngOnInit(): void {
    this.AllCus.flag = true
    console.log(this.AllCus.flag);
  }
  //יש משתנה ציבורי שכאשר המשתמש לוחץ על כניסה המשנה נהפך לfalse ולךפי המשנה הנל אנו נראה את הקטגוריות(לא רצינו להראות את הקט בכל הדפים )
  go() {
    this.AllCus.flag = false

    this.route.navigate([`./prudact`])
  }
}
