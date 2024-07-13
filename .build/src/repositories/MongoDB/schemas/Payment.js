"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    id: { type: String, index: true },
    orderId: { type: String, required: true },
    price: { type: Number, required: true },
    qrCode: { type: String, required: true },
    pay: { type: Boolean, required: true },
});
exports.PaymentModel = (0, mongoose_1.model)("Payment", paymentSchema);
//# sourceMappingURL=Payment.js.map