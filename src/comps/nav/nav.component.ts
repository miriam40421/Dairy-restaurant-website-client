import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CustomerService } from '../../servisies/customer.service';

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet,RouterLink,LoginComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone:true

})
export class NavComponent {
constructor(public AllCus:CustomerService){}

}
