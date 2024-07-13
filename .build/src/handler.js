'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOrder = exports.payOrderId = exports.searchPaymentByOrderId = exports.generatepayment = void 0;
const payment_1 = __importDefault(require("./entity/payment"));
const paymentUseCase_1 = require("./useCase/paymentUseCase");
const mongoose_1 = require("mongoose");
const amazonSQS_1 = require("./mensageria/amazonSQS");
const mongoUrl = (_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : '';
(async () => {
    await (0, mongoose_1.connect)(mongoUrl);
})();
if (process.env.IS_OFFLINE) {
    console.log('Rodando com serverless-offline. Iniciando o polling da fila SQS...');
    (async () => {
        try {
            await (0, amazonSQS_1.pollQueue)();
        }
        catch (error) {
            console.error('Erro ao iniciar o polling da fila:', error);
        }
    })();
}
const generatepayment = async (event) => {
    try {
        if (event.body !== undefined && event.body !== null) {
            console.log(mongoUrl);
            //await connect(mongoUrl);
            const paymentUseCase = new paymentUseCase_1.PaymentUseCase();
            const { orderId, price } = JSON.parse(event.body);
            const payment = new payment_1.default(orderId, price);
            const result = await paymentUseCase.generatePayment(payment);
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
                },
                statusCode: 200,
                body: JSON.stringify(result),
            };
        }
        else {
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
                },
                statusCode: 400,
                body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body }),
            };
        }
    }
    catch (error) {
        console.log(event.body);
        return {
            headers: {
                'Content-Type': 'application/json',
                'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
            },
            statusCode: 500,
            body: JSON.stringify({ erro: error.message + " " + event }),
        };
    }
};
exports.generatepayment = generatepayment;
const searchPaymentByOrderId = async (event) => {
    try {
        if (event.pathParameters !== undefined && event.pathParameters !== null) {
            console.log(mongoUrl);
            const { orderId } = event.pathParameters;
            const paymentUseCase = new paymentUseCase_1.PaymentUseCase();
            const result = await paymentUseCase.searchPaymentByOrderId(orderId);
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
                },
                statusCode: 200,
                body: JSON.stringify(result),
            };
        }
        else {
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
                },
                statusCode: 400,
                body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body }),
            };
        }
    }
    catch (error) {
        console.log(event.body);
        return {
            headers: {
                'Content-Type': 'application/json',
                'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
            },
            statusCode: 500,
            body: JSON.stringify({ erro: error.message + " " + event }),
        };
    }
};
exports.searchPaymentByOrderId = searchPaymentByOrderId;
const payOrderId = async (event) => {
    try {
        if (event.pathParameters !== undefined && event.pathParameters !== null) {
            const { orderId } = event.pathParameters;
            const paymentUseCase = new paymentUseCase_1.PaymentUseCase();
            const result = await paymentUseCase.payOrderId(orderId);
            await (0, amazonSQS_1.sendMessageToQueuePay)(JSON.stringify(result));
            return {
                statusCode: 200,
                body: JSON.stringify(result),
            };
        }
        else {
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
                },
                statusCode: 400,
                body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body }),
            };
        }
    }
    catch (error) {
        console.log(event.body);
        return {
            headers: {
                'Content-Type': 'application/json',
                'X-Content-Type-Options': 'nosniff' // Adicionando o cabeçalho X-Content-Type-Options
            },
            statusCode: 500,
            body: JSON.stringify({ erro: error.message + " " + event }),
        };
    }
};
exports.payOrderId = payOrderId;
const processOrder = async (event) => {
    for (const record of event.Records) {
        console.log('Mensagem: ', record.body);
        const order = JSON.parse(record.body);
        console.log('Processando Pedido:', order);
        try {
            // Lógica para processar o pedido
            const paymentUseCase = new paymentUseCase_1.PaymentUseCase();
            const { orderId, price } = JSON.parse(record.body);
            const payment = new payment_1.default(orderId, price);
            const result = await paymentUseCase.generatePayment(payment);
            // Chame sua função de handler localmente
            await (0, amazonSQS_1.sendMessageToQueue)(JSON.stringify(result));
        }
        catch (error) {
            console.error('Falha ao processar o pedido:', error);
            // Lógica de compensação pode ser implementada aqui
        }
    }
};
exports.processOrder = processOrder;
//# sourceMappingURL=handler.js.map