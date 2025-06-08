import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { CustomerComponent } from '../comps/customer/customer.component';
import { HomeComponent } from '../comps/home/home.component';
// import { PrudactsComponent } from '../comps/prudacts/prudacts.component';
import { NavComponent } from '../comps/nav/nav.component';
@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [HomeComponent,CustomerComponent,PrudactsComponent],
  imports: [RouterOutlet, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project';
}

