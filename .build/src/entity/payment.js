"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class Payment {
    ;
    constructor(orderId, price) {
        this.setNewId = () => {
            this.id = (0, crypto_1.randomUUID)();
        };
        this.setNewQrCode = (qrCode) => {
            this.qrCode = qrCode;
        };
        this.orderId = orderId;
        this.price = price;
        this.pay = false;
    }
}
exports.default = Payment;
//# sourceMappingURL=payment.js.map