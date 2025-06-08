import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../servisies/details.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CustomerService } from '../../servisies/customer.service';
import { Customer } from '../../classes/Customer';
import { Prudact } from '../../classes/Prudact';
import { PrudactService } from '../../servisies/prudact.service';
import { Details } from '../../classes/Details';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../classes/Order';
import { OrderService } from '../../servisies/order.service';
import Swal from 'sweetalert2';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-cart',
  imports: [FormsModule,],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  standalone:true

})
export class CartComponent implements OnInit {
  flag: boolean = false
  mytz: string | undefined
  f: boolean = false
  o: string = ""
  allp: Array<Prudact> = new Array<Prudact>()
  c: Customer= new Customer()
  custs: Array<Customer> = new Array<Customer>()
  constructor(public listDetails: DetailsService, public AllCus: CustomerService, public allpr: PrudactService, public route: Router, public or: OrderService,public ar: ActivatedRoute) { }
  ngOnInit(): void {
    this.Allsum()

    console.log(this.allpr.Allp2);
  }
  //להכנסת ערכים input פותחת  
  chekId() {
    this.flag = true
  }
 //מחפשת את הבן אדם
  login(id: string) {
        this.mytz = id
        this.AllCus.getById(id).subscribe(
          // אם הבן אדם נמצא יוצרת לו הזמנה
          x => {
            this.c = x, 
            this.f = true;
            this.or.order.cust = this.c
            console.log(this.or.order.cust);
            console.log(this.c.dateOfBirth);
            this.or.order.sum = this.allpr.sum
            this.or.order.ordDate = (new Date())
            this.or.order.isPaid = false
            this.or.order.listDetails = this.listDetails.AllDetails
            console.log(this.o);   
            this.or.returnSum(  new Date(this.c.dateOfBirth!).toISOString().slice(0, 10),this.or.order.sum).subscribe(
              d => {
              console.log(this.or.order.ordDate!.toISOString().slice(0, 10));
              this.allpr.sum = d;
             
              
              },
              error => {
                alert(error.messege)  
              }
            )
           
          },
          err => {
            // popup אם לא מצא פותחת לו 
            this.flag=false
            Swal.fire({
              title: 'אינך רשום ',
              text: 'נראה כי אינך רשום במערכת',
              icon:"error"
      })
          }
        )
   
    
      }
//  הוספת מוצר לעגלת הקניות
  AddtoCart(prod: Prudact) {
    let index = this.listDetails.AllDetails.findIndex(x => x.Prod == prod)
    this.listDetails.AllDetails[index].qty = (this.listDetails.AllDetails[index].qty)! + 1;
                // service מעדכנת את הסכום ואת כמות המוצרים שקנה שנמצא ב
                this.Allsum()
  }
  // מחיקת כמות מוצר מהעגלה
  deleteC(prod: Prudact) {
    let index = this.listDetails.AllDetails.findIndex(x => x.Prod?.prodId == prod.prodId)
    this.listDetails.AllDetails[index].qty = (this.listDetails.AllDetails[index].qty)! - 1;
    if(this.listDetails.AllDetails[index].qty==0){
      this.listDetails.AllDetails.splice(index, 1)

    }
                // service מעדכנת את הסכום ואת כמות המוצרים שקנה שנמצא ב
                this.Allsum()
  }

  // לגמרי מחיקת  מוצר מהעגלה

  deleteAll(prodId: number) {
    console.log(prodId);
    let index = this.listDetails.AllDetails.findIndex(x => x.Prod?.prodId == prodId)
    this.listDetails.AllDetails.splice(index, 1)
    console.log(this.listDetails.AllDetails);
    console.log(this.allpr.Allp2);

  }
                // service מעדכנת את הסכום ואת כמות המוצרים שקנה שנמצא ב

  Allsum() {
    this.allpr.sum = 0
    this.allpr.sum1 = 0
    for (let index = 0; index < this.listDetails.AllDetails.length; index++) {
      this.allpr.sum += this.listDetails.AllDetails[index].Prod?.cost!*this.listDetails.AllDetails[index].qty!
      this.allpr.sum1+=this.listDetails.AllDetails[index].qty!

    }
  }
  pay() {
    this.route.navigate([`./pay`])
  }
}
