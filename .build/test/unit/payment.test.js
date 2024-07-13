"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InMemoryPaymentRepository_1 = __importDefault(require("../../src/repositories/Memory/InMemoryPaymentRepository"));
const payment_1 = __importDefault(require("../../src/entity/payment"));
const paymentUtil_1 = __importDefault(require("../../src/utils/paymentUtil"));
const crypto_1 = require("crypto");
test('Should add an element with payment with false', async () => {
    const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
    const price = 100.20;
    const paymentData = new payment_1.default(orderId, price);
    paymentData.id = (0, crypto_1.randomUUID)();
    const qrCode = await new paymentUtil_1.default().generateQRCode(paymentData);
    paymentData.setNewQrCode(qrCode);
    const paymentRepositoryMemory = new InMemoryPaymentRepository_1.default();
    await paymentRepositoryMemory.save(paymentData);
    const payment = await paymentRepositoryMemory.findByToOrderId(paymentData.orderId);
    expect(payment.orderId).toBe(orderId);
    expect(payment.price).toBe(price);
    expect(payment).not.toBeNull();
    expect(payment.pay).toBe(false);
});
test('Should list a payment in list', async () => {
    const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
    const price = 100.20;
    const paymentData = new payment_1.default(orderId, price);
    paymentData.id = (0, crypto_1.randomUUID)();
    const qrCode = await new paymentUtil_1.default().generateQRCode(paymentData);
    paymentData.setNewQrCode(qrCode);
    const paymentRepositoryMemory = new InMemoryPaymentRepository_1.default();
    await paymentRepositoryMemory.save(paymentData);
    const payments = await paymentRepositoryMemory.list();
    expect(payments).not.toBeNull;
    expect(payments).not.toBeNull;
});
test('Should pay a payment', async () => {
    const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
    const price = 100.20;
    const paymentData = new payment_1.default(orderId, price);
    paymentData.id = (0, crypto_1.randomUUID)();
    const qrCode = await new paymentUtil_1.default().generateQRCode(paymentData);
    paymentData.setNewQrCode(qrCode);
    const paymentRepositoryMemory = new InMemoryPaymentRepository_1.default();
    await paymentRepositoryMemory.save(paymentData);
    expect(paymentData.pay).toBe(false);
    paymentData.pay = true;
    await paymentRepositoryMemory.update(paymentData);
    expect(paymentData.pay).toBe(true);
});
//# sourceMappingURL=payment.test.js.map