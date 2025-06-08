import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../servisies/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../classes/Customer';
import { OrderService } from '../../servisies/order.service';
import { PrudactService } from '../../servisies/prudact.service';
import { DetailsService } from '../../servisies/details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay',
  imports: [],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css',
  standalone:true

})
export class PayComponent  {
  id: string = ""
  c: Customer = new Customer()
  cost: number = 0
  constructor(public cust: CustomerService, public ar: ActivatedRoute, public ord: OrderService, public allpru: PrudactService, public alld: DetailsService, public route: Router) { }
 
  save() {
    console.log("start pay");

    this.ord.order.sum = this.allpru.sum
    console.log(this.ord.order);
    this.ord.add(this.ord.order).subscribe(
      d => {
        if (d)
          console.log(" בהצלחה");
        console.log(this.ord.order.sum);
        this.alld.AllDetails = []
        Swal.fire({
          title: 'הזמנתך נרשמה  בהצלחה',
          icon: "success"
        })
        this.route.navigate([`./home`])
      },
      error => {
        console.log(error);
      }
    )
  }
}
