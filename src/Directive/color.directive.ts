import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appColor]',
  standalone:true

})
export class ColorDirective {

  constructor(private er:ElementRef) { }
//   הרקע משתנה mouseenterבזמן ש
@HostListener("mouseenter") o(){
  this.er.nativeElement.style.backgroundColor="black"
}

@HostListener("mouseleave") d(){
  this.er.nativeElement.style.backgroundColor=""
}
}
