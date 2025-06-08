import { Customer } from "./Customer";
import { Details } from "./Details";

export class Order {

    constructor( 
        //  public ordNum?: number,
         public cust?:Customer , 
         public ordDate?:Date,
         public sum?:number,
         public isPaid?:boolean,
         public listDetails?:Array<Details>) { }
}
