'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payOrderId = exports.searchPaymentByOrderId = exports.generatepayment = void 0;
const payment_1 = __importDefault(require("./entity/payment"));
const paymentUseCase_1 = require("./useCase/paymentUseCase");
const mongoose_1 = require("mongoose");
const mongoUrl = "mongodb+srv://fiap-pos:yDjVkBRmkGNN6fpu@cluster-teste.bwzlfbw.mongodb.net/base_fastfood";
const generatepayment = async (event) => {
    try {
        if (event.body !== undefined && event.body !== null) {
            await (0, mongoose_1.connect)(mongoUrl);
            const paymentUseCase = new paymentUseCase_1.PaymentUseCase();
            const { orderId, price } = JSON.parse(event.body);
            const payment = new payment_1.default(orderId, price);
            const result = await paymentUseCase.generatePayment(payment);
            return {
                statusCode: 200,
                body: JSON.stringify(result),
            };
        }
        else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body }),
            };
        }
    }
    catch (error) {
        console.log(event.body);
        return {
            statusCode: 500,
            body: JSON.stringify({ erro: error.message + " " + event }),
        };
    }
};
exports.generatepayment = generatepayment;
const searchPaymentByOrderId = async (event) => {
    try {
        if (event.pathParameters !== undefined && event.pathParameters !== null) {
            await (0, mongoose_1.connect)(mongoUrl);
            const { orderId } = event.pathParameters;
            const paymentUseCase = new paymentUseCase_1.PaymentUseCase();
            const result = await paymentUseCase.searchPaymentByOrderId(orderId);
            return {
                statusCode: 200,
                body: JSON.stringify(result),
            };
        }
        else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body }),
            };
        }
    }
    catch (error) {
        console.log(event.body);
        return {
            statusCode: 500,
            body: JSON.stringify({ erro: error.message + " " + event }),
        };
    }
};
exports.searchPaymentByOrderId = searchPaymentByOrderId;
const payOrderId = async (event) => {
    try {
        if (event.pathParameters !== undefined && event.pathParameters !== null) {
            await (0, mongoose_1.connect)(mongoUrl);
            const { orderId } = event.pathParameters;
            const paymentUseCase = new paymentUseCase_1.PaymentUseCase();
            const result = await paymentUseCase.payOrderId(orderId);
            return {
                statusCode: 200,
                body: JSON.stringify(result),
            };
        }
        else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body }),
            };
        }
    }
    catch (error) {
        console.log(event.body);
        return {
            statusCode: 500,
            body: JSON.stringify({ erro: error.message + " " + event }),
        };
    }
};
exports.payOrderId = payOrderId;
//# sourceMappingURL=handler.js.map