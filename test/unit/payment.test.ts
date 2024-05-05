import InMemoryPaymentrepository from "../../src/repositories/Memory/InMemoryPaymentRepository";
import Payment from "../../src/entity/payment";
import PaymentUtil from "../../src/utils/paymentUtil";
import { randomUUID } from "crypto";


test('Should add an element with payment with false', async () => {
    const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
    const price = 100.20;
    const paymentData = new Payment(orderId, price);
    paymentData.id = randomUUID();
    const qrCode = await new PaymentUtil().generateQRCode(paymentData);
    paymentData.setNewQrCode(qrCode);

    const paymentRepositoryMemory = new InMemoryPaymentrepository();
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
        const paymentData = new Payment(orderId, price);
        paymentData.id = randomUUID();
        const qrCode = await new PaymentUtil().generateQRCode(paymentData);
        paymentData.setNewQrCode(qrCode);

        const paymentRepositoryMemory = new InMemoryPaymentrepository();
        await paymentRepositoryMemory.save(paymentData);
        const payments = await paymentRepositoryMemory.list();
        expect(payments).not.toBeNull;
        expect(payments).not.toBeNull;
    });


test('Should pay a payment', async () => {
    const orderId = "6d8e9f80-0766-4fef-8430-544e9750a9c9";
    const price = 100.20;
    const paymentData = new Payment(orderId, price);
    paymentData.id = randomUUID();
    const qrCode = await new PaymentUtil().generateQRCode(paymentData);
    paymentData.setNewQrCode(qrCode);
    
    const paymentRepositoryMemory = new InMemoryPaymentrepository();
    await paymentRepositoryMemory.save(paymentData);
    expect(paymentData.pay).toBe(false);
    paymentData.pay =  true;

    await paymentRepositoryMemory.update(paymentData);
    expect(paymentData.pay).toBe(true);
})
