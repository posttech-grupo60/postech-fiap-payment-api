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
const payment_1 = __importDefault(require("../../src/entity/payment"));
const sinon_1 = __importDefault(require("sinon"));
const cucumber_1 = require("@cucumber/cucumber");
const Payment_1 = require("../../src/repositories/MongoDB/schemas/Payment");
const MongoDBPaymentRepository_1 = __importDefault(require("../../src/repositories/MongoDB/MongoDBPaymentRepository"));
const assert = __importStar(require("assert"));
const { randomUUID } = require("crypto");
let paymentRepository;
let saveStub;
let updateStub;
let findByPaymentToOrderIdStub;
let paymentData;
let pay = new payment_1.default("6d8e9f80-0766-4fef-8430-544e9750a9c9", 100.00);
pay.id = '12345678';
saveStub = sinon_1.default.stub(Payment_1.PaymentModel.prototype, 'save').resolves();
updateStub = sinon_1.default.stub(Payment_1.PaymentModel, 'findOneAndUpdate').resolves();
findByPaymentToOrderIdStub = sinon_1.default.stub(Payment_1.PaymentModel, 'findOne').resolves(pay);
paymentRepository = new MongoDBPaymentRepository_1.default();
(0, cucumber_1.Given)('Quando tenho uma nova orderId', async () => {
    const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
    const price = 100.20;
    paymentData = new payment_1.default(orderId, price);
});
(0, cucumber_1.When)('Devo criar um pagamento com o orderId', async function () {
    await paymentRepository.save(paymentData);
});
(0, cucumber_1.Then)('Precisa existir o pagamento como payment false', async () => {
    const pay = await paymentRepository.findByPaymentToOrderId(paymentData.orderId);
    sinon_1.default.assert.calledOnce(saveStub);
    assert.ok(pay.orderId == paymentData.orderId);
    assert.ok(pay.payment == false);
});
(0, cucumber_1.Given)('Quando tenho um pagamento', async () => {
    const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
    const price = 100.20;
    paymentData = new payment_1.default(orderId, price);
    await paymentRepository.save(paymentData);
});
(0, cucumber_1.When)('Devo atualizar ele para pago', async function () {
    await paymentRepository.update(paymentData.orderId);
});
(0, cucumber_1.Then)('Entao ele precisa passar uma vez pelo update', async () => {
    sinon_1.default.assert.calledOnce(updateStub);
});
(0, cucumber_1.Given)('Quando tenho um novo requerimento de orderId', async () => {
    const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
    const price = 100.20;
    paymentData = new payment_1.default(orderId, price);
});
(0, cucumber_1.When)('Devo salvar os dados na base', async function () {
    await paymentRepository.save(paymentData);
});
(0, cucumber_1.Then)('Entao eu preciso encontrar esse pagamento', async () => {
    const pay = await paymentRepository.findByPaymentToOrderId(paymentData.orderId);
    assert.ok(pay.orderId == paymentData.orderId);
});
//# sourceMappingURL=payment_service_step.js.map