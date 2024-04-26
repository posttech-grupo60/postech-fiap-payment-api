"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBPaymentRepository_1 = __importDefault(require("../repositories/MongoDB/MongoDBPaymentRepository"));
const paymentUtil_1 = __importDefault(require("../utils/paymentUtil"));
class PaymentService {
    constructor() {
        this.paymentUtil = new paymentUtil_1.default();
        this.paymentRepository = new MongoDBPaymentRepository_1.default();
    }
    async createPayment(payment) {
        const qrCode = await this.paymentUtil.generateQRCode(payment);
        console.log("QrCode " + qrCode);
        payment.setNewQrCode(qrCode);
        payment.setNewId;
        return this.paymentRepository.save(payment);
    }
    async searchPaymentByOrderId(orderId) {
        return this.paymentRepository.findByPaymentToOrderId(orderId);
    }
    async payOrderId(orderId) {
        return this.paymentRepository.update(orderId);
    }
}
exports.default = PaymentService;
//# sourceMappingURL=paymentService.js.map