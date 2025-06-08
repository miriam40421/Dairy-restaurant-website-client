import { Routes } from '@angular/router';
import { HomeComponent } from '../comps/home/home.component';
import { MoredetailsComponent } from '../comps/moredetails/moredetails.component';
import { CartComponent } from '../comps/cart/cart.component';
import { LoginComponent } from '../comps/login/login.component';
import { PayComponent } from '../comps/pay/pay.component';
import { CategoryComponent } from '../comps/category/category.component';
export const routes: Routes = [
    
    {path:'home', component:HomeComponent,title:'דף הבית'},
    {path:'details/:PId', component:MoredetailsComponent,title:"פרטים"}, 
    {path:'cart', component:CartComponent, title:'סל הקניות'},
    {path:'logi', component:LoginComponent,title:'הרשמה'},
    {path:'pay', component:PayComponent,title:'תשלום'},
    {path:'prudact', component:CategoryComponent,title:'מוצרים'},
        {path:'**', component:HomeComponent,title:'דף הבית'},
    {path:'', component:HomeComponent,title:'דף הבית'},

];
