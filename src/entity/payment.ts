import { IPayment } from "../repositories/MongoDB/schemas/Payment";
import { randomUUID } from "crypto";

export default class Payment {
    id?: string | null | undefined;
    orderId: string;
    price: number;
    qrCode: string | null | undefined;;
    pay: boolean

    constructor(orderId: string, price: number) {
        this.orderId = orderId;
        this.price = price; 
        this.pay = false;
    }
    
    setNewId = () =>{
        this.id = randomUUID();
    }
    setNewQrCode = (qrCode: string) => {
        this.qrCode = qrCode;  
    }
    
   
}