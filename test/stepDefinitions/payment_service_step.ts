import Payment from "../../src/entity/payment";
import sinon from 'sinon';
import { Given, When, Then } from "@cucumber/cucumber";
import { PaymentModel } from "../../src/repositories/MongoDB/schemas/Payment";
import MongoDBPaymentrepository from "../../src/repositories/MongoDB/MongoDBPaymentRepository";
import * as assert from "assert";

const { randomUUID } = require("crypto");

let paymentRepository: MongoDBPaymentrepository;
let saveStub: sinon.SinonStub;
let updateStub: sinon.SinonStub;
let findByPaymentToOrderIdStub: sinon.SinonStub;
let paymentData: Payment;
let pay = new Payment("6d8e9f80-0766-4fef-8430-544e9750a9c9", 100.00);
pay.id = '12345678';
saveStub = sinon.stub(PaymentModel.prototype, 'save').resolves();
updateStub = sinon.stub(PaymentModel, 'findOneAndUpdate').resolves();
findByPaymentToOrderIdStub = sinon.stub(PaymentModel, 'findOne').resolves(pay);


paymentRepository = new MongoDBPaymentrepository();

Given('Quando tenho uma nova orderId', async () => {
  const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
  const price = 100.20;
  paymentData = new Payment(orderId, price);
});

When('Devo criar um pagamento com o orderId', async function () {
  await paymentRepository.save(paymentData);
});

Then('Precisa existir o pagamento como payment false', async () => {
  const pay  = await paymentRepository.findByPaymentToOrderId(paymentData.orderId)
  sinon.assert.calledOnce(saveStub);
  assert.ok(pay.orderId == paymentData.orderId);
  assert.ok(pay.pay == false);
});


Given('Quando tenho um pagamento', async () => {
  const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
  const price = 100.20;
  paymentData = new Payment(orderId, price);
  await paymentRepository.save(paymentData);  
});

When('Devo atualizar ele para pago', async function () {
  await paymentRepository.update(paymentData.orderId);
});

Then('Entao ele precisa passar uma vez pelo update', async () => {
  sinon.assert.calledOnce(updateStub);
});

Given('Quando tenho um novo requerimento de orderId', async () => {
  const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
  const price = 100.20;
  paymentData = new Payment(orderId, price);
});

When('Devo salvar os dados na base', async function () {
  await paymentRepository.save(paymentData);  
});

Then('Entao eu preciso encontrar esse pagamento', async () => {
  const pay  = await paymentRepository.findByPaymentToOrderId(paymentData.orderId);
  assert.ok(pay.orderId == paymentData.orderId);
});

 