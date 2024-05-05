import Payment from "../entity/payment";
import MongoDBPaymentrepository from "../repositories/MongoDB/MongoDBPaymentRepository";
import PaymentUtil from "../utils/paymentUtil";

export default class PaymentService {
    paymentUtil: PaymentUtil;
    paymentRepository: MongoDBPaymentrepository;

    constructor(){
        this.paymentUtil =  new PaymentUtil();
        this.paymentRepository = new MongoDBPaymentrepository();
    }
    async createPayment(payment: Payment){
        const qrCode = await this.paymentUtil.generateQRCode(payment);
        console.log("QrCode " + qrCode);
        payment.setNewQrCode(qrCode);
        payment.setNewId();
        console.log("Qual id ficou " + payment.id);
        return this.paymentRepository.save(payment);
    }

    async searchPaymentByOrderId(orderId: string) : Promise<Payment>{
        return this.paymentRepository.findByPaymentToOrderId(orderId);
    }

    async payOrderId(orderId: string) : Promise<Payment | null>{
        return this.paymentRepository.update(orderId);
    }
  
}