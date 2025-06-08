import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../classes/Customer';
import Swal from "sweetalert2"
import { scan } from 'rxjs';
import { CustomerService } from '../../servisies/customer.service';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './login.component.html',

    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    newC: Customer = new Customer();
    isPopupVisible = false;
    username: string = '';
    email: string = '';

    constructor(public custSer: CustomerService) {

    }
    togglePopup() {
        this.isPopupVisible = !this.isPopupVisible;
    }
// בעת שליחה אנו מוסיפות את המשתמש החדש
    onSubmit() {
        console.log(this.newC);

        this.custSer.add(this.newC).subscribe(
            x => {
                if (x) {
                    Swal.fire({
                        title: 'נרשמת בהצלחה',
                        icon: "success"
                    })
                    this.custSer.newCust = this.newC
                }


                else if (!x) {
                    Swal.fire({
                        title: 'ההרשמה נכשלה',
                        text: 'נראה כי הינך רשום במערכת',
                        icon: "info"
                    })
                    this.custSer.newCust = this.newC

                }
                else
                    Swal.fire({
                        title: 'ההרשמה נכשלה',
                        icon: "error"
                    })

            }
            , err => console.log(err.message)
        )
        this.togglePopup();
    }
}
