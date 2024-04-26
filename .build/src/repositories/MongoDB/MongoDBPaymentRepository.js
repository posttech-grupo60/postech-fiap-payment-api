"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = __importDefault(require("../../entity/payment"));
const Payment_1 = require("./schemas/Payment");
class MongoDBPaymentrepository {
    async save(payment) {
        await new Payment_1.PaymentModel(payment).save();
        return payment;
    }
    async update(orderId) {
        try {
            const payment = await this.findByPaymentToOrderId(orderId);
            payment.payment = true;
            console.log('Payment Id = ' + payment.id + " Dados = " + payment.payment);
            const result = await Payment_1.PaymentModel.findOneAndUpdate({ id: payment.id }, payment);
            console.log("Dados " + result);
            return result ? payment : null;
        }
        catch (error) {
            throw new Error("Erro ao atualizar pedido: " + error);
        }
    }
    async findByPaymentToOrderId(orderId) {
        const payment = await Payment_1.PaymentModel.findOne({ orderId: orderId });
        console.log('Payment' + payment);
        if (!payment)
            throw new Error("Payment to Order not found");
        return convertModelToObject(payment);
    }
}
exports.default = MongoDBPaymentrepository;
const convertModelToObject = async (iPayment) => {
    const payment = new payment_1.default(iPayment.orderId, iPayment.price);
    payment.id = iPayment.id;
    payment.qrCode = iPayment.qrCode;
    payment.payment = iPayment.payment;
    return await payment;
};
//# sourceMappingURL=MongoDBPaymentRepository.js.map