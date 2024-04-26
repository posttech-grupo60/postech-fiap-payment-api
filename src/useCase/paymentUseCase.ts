import Payment from "../entity/payment";
import PaymentService from "../services/paymentService";


export class PaymentUseCase {

    paymentService: PaymentService;
    constructor() {
        this.paymentService = new PaymentService();
    }


    async generatePayment(payment: Payment): Promise<any> {
        try {
            return this.paymentService.createPayment(payment);    
            
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return null;
        }
    }

    async searchPaymentByOrderId(orderId: string): Promise<Payment | null> {
        try {
            return this.paymentService.searchPaymentByOrderId(orderId);    
            
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return null;
        }
    }

    async payOrderId(orderId: string): Promise<Payment | null> {
        try {
            return this.paymentService.payOrderId(orderId);    
            
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return null;
        }
    }
}