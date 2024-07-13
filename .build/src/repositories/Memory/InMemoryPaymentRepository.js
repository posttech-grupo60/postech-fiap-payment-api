"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryPaymentrepository {
    constructor() {
        this.payments = [];
    }
    async save(payment) {
        this.payments.push(payment);
        return payment;
    }
    async list() {
        return this.payments;
    }
    async findByToOrderId(orderId) {
        const payment = this.payments.find((payment) => payment.orderId === orderId);
        if (!payment)
            throw new Error("Payment not found!");
        return payment;
    }
    async update(payment) {
        const index = this.payments.findIndex((o) => o.id === payment.id);
        if (index === -1)
            throw new Error("Paymnent not found!");
        this.payments[index] = payment;
        return payment;
    }
}
exports.default = InMemoryPaymentrepository;
//# sourceMappingURL=InMemoryPaymentRepository.js.map