"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const payment_1 = __importDefault(require("../../src/entity/payment"));
const InMemoryPaymentRepository_1 = __importDefault(require("../../src/repositories/Memory/InMemoryPaymentRepository"));
const paymentUtil_1 = __importDefault(require("../../src/utils/paymentUtil"));
const cucumber_1 = require("@cucumber/cucumber");
const { randomUUID } = require("crypto");
let paymentData;
const paymentRepositoryMemory = new InMemoryPaymentRepository_1.default();
(0, cucumber_1.Given)('Quando tenho um orderId', async () => {
    const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
    const price = 100.20;
    paymentData = new payment_1.default(orderId, price);
    paymentData.id = randomUUID();
    const qrCode = await new paymentUtil_1.default().generateQRCode(paymentData);
    paymentData.setNewQrCode(qrCode);
});
(0, cucumber_1.When)('Devo criar um pagamento', async () => {
    await paymentRepositoryMemory.save(paymentData);
});
(0, cucumber_1.Then)('Precisa existir pagamentos', async () => {
    const payments = await paymentRepositoryMemory.list();
    assert.notStrictEqual(payments, null);
    assert.ok(payments.length > 0);
});
(0, cucumber_1.Given)('Quando tenho um novo pagamento', async () => {
    const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
    const price = 100.20;
    paymentData = new payment_1.default(orderId, price);
    paymentData.id = randomUUID();
    const qrCode = await new paymentUtil_1.default().generateQRCode(paymentData);
    paymentData.setNewQrCode(qrCode);
});
(0, cucumber_1.When)('Devo criar um pagamento na base', async () => {
    await paymentRepositoryMemory.save(paymentData);
});
(0, cucumber_1.Then)('Quando buscar ele, o pagamento deve estar com o status de pagamento false', async () => {
    const payment = await paymentRepositoryMemory.findByToOrderId("6d8e9f80-0766-4fef-8430-544e9750a9c9");
    assert.notStrictEqual(payment, null);
    assert.ok(payment.payment == false);
});
(0, cucumber_1.Given)('Quando eu adicionar um novo pagamento', async () => {
    const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
    const price = 100.20;
    paymentData = new payment_1.default(orderId, price);
    paymentData.id = randomUUID();
    const qrCode = await new paymentUtil_1.default().generateQRCode(paymentData);
    paymentData.setNewQrCode(qrCode);
    await paymentRepositoryMemory.save(paymentData);
});
(0, cucumber_1.When)('Devo colocar o pedido como pago', async () => {
    const payment = await paymentRepositoryMemory.findByToOrderId("6d8e9f80-0766-4fef-8430-544e9750a9c9");
    payment.payment = true;
    await paymentRepositoryMemory.update(payment);
});
(0, cucumber_1.Then)('Quando buscar ele, ele precisa estar com o status de pagamento true', async () => {
    const payment = await paymentRepositoryMemory.findByToOrderId("6d8e9f80-0766-4fef-8430-544e9750a9c9");
    assert.notStrictEqual(payment, null);
    assert.ok(payment.payment == true);
});
//# sourceMappingURL=payment_steps.js.map