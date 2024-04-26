import { IPayment } from "../repositories/MongoDB/schemas/Payment";

export default class Payment {
    id?: string | null | undefined;
    orderId: string;
    price: number;
    qrCode: string | null | undefined;;
    payment: boolean

    constructor(orderId: string, price: number) {
        this.orderId = orderId;
        this.price = price; 
        this.payment = false;
    }
    
    setNewId = () =>{
        this.id = crypto.randomUUID();
    }
    setNewQrCode = (qrCode: string) => {
        this.qrCode = qrCode;  
    }
    
   
}