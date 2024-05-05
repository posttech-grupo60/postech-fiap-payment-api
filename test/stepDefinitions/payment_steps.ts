import * as assert from "assert";
import Payment from "../../src/entity/payment";
import InMemoryPaymentRepository from "../../src/repositories/Memory/InMemoryPaymentRepository";
import PaymentUtil from "../../src/utils/paymentUtil";
import { Given, When, Then } from "@cucumber/cucumber";

const { randomUUID } = require("crypto");

let paymentData:  Payment;
const paymentRepositoryMemory = new InMemoryPaymentRepository();

Given('Quando tenho um orderId', async () => {
  const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
  const price = 100.20;
  paymentData = new Payment(orderId, price);
  paymentData.id = randomUUID();
  const qrCode = await new PaymentUtil().generateQRCode(paymentData);
  paymentData.setNewQrCode(qrCode);

});

When('Devo criar um pagamento', async () => {
  await paymentRepositoryMemory.save(paymentData);
});

Then('Precisa existir pagamentos', async () => {
  const payments = await paymentRepositoryMemory.list();
  assert.notStrictEqual(payments, null);
  assert.ok(payments.length > 0);
});

Given('Quando tenho um novo pagamento', async () => {
  const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
  const price = 100.20;
  paymentData = new Payment(orderId, price);
  paymentData.id = randomUUID();
  const qrCode = await new PaymentUtil().generateQRCode(paymentData);
  paymentData.setNewQrCode(qrCode);
  
});

When('Devo criar um pagamento na base', async () => {
    await paymentRepositoryMemory.save(paymentData);
});

Then('Quando buscar ele, o pagamento deve estar com o status de pagamento false', async () => {
  const payment = await paymentRepositoryMemory.findByToOrderId("6d8e9f80-0766-4fef-8430-544e9750a9c9");
  assert.notStrictEqual(payment, null);
  assert.ok(payment.pay == false);
});


Given('Quando eu adicionar um novo pagamento', async () => {
  const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
  const price = 100.20;
  paymentData = new Payment(orderId, price);
  paymentData.id = randomUUID();
  const qrCode = await new PaymentUtil().generateQRCode(paymentData);
  paymentData.setNewQrCode(qrCode);
  await paymentRepositoryMemory.save(paymentData);
});

When('Devo colocar o pedido como pago', async () => {
  const payment = await paymentRepositoryMemory.findByToOrderId("6d8e9f80-0766-4fef-8430-544e9750a9c9");
  payment.pay = true;
  await paymentRepositoryMemory.update(payment);
});

Then('Quando buscar ele, ele precisa estar com o status de pagamento true', async () => {
  const payment = await paymentRepositoryMemory.findByToOrderId("6d8e9f80-0766-4fef-8430-544e9750a9c9");
  assert.notStrictEqual(payment, null);
  assert.ok(payment.pay == true);
});