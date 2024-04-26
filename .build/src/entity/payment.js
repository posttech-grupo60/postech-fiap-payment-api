"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Payment {
    ;
    constructor(orderId, price) {
        this.setNewId = () => {
            this.id = crypto.randomUUID();
        };
        this.setNewQrCode = (qrCode) => {
            this.qrCode = qrCode;
        };
        this.orderId = orderId;
        this.price = price;
        this.payment = false;
    }
}
exports.default = Payment;
//# sourceMappingURL=payment.js.map