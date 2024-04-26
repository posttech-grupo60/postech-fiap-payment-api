"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentUseCase = void 0;
const paymentService_1 = __importDefault(require("../services/paymentService"));
class PaymentUseCase {
    constructor() {
        this.paymentService = new paymentService_1.default();
    }
    async generatePayment(payment) {
        try {
            return this.paymentService.createPayment(payment);
        }
        catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return null;
        }
    }
    async searchPaymentByOrderId(orderId) {
        try {
            return this.paymentService.searchPaymentByOrderId(orderId);
        }
        catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return null;
        }
    }
    async payOrderId(orderId) {
        try {
            return this.paymentService.payOrderId(orderId);
        }
        catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return null;
        }
    }
}
exports.PaymentUseCase = PaymentUseCase;
//# sourceMappingURL=paymentUseCase.js.map