import Payment from "../../entity/payment";


export default class InMemoryPaymentrepository {
  payments: Payment[] = [];
  async save(payment: Payment): Promise<Payment> {
    this.payments.push(payment);
    return payment;
  }
  async list(): Promise<Payment[]> {
    return this.payments;
  }

  async findByToOrderId(orderId: string | null): Promise<Payment> {
    const payment = this.payments.find((payment) => payment.orderId === orderId);
    if (!payment) throw new Error("Payment not found!");
    return payment;
  }

  async update(payment: Payment): Promise<Payment> {
    const index = this.payments.findIndex((o) => o.id === payment.id);
    if (index === -1) throw new Error("Paymnent not found!");
    this.payments[index] = payment;
    return payment;
  }
}