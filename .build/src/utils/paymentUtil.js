"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaymentUtil {
    // Função para gerar o payload PIX
    async generatePixPayload(pixPayload) {
        let payload = '000201'; // Versão do payload
        payload += '010212'; // Indica chave PIX
        payload += '26530014' + pixPayload.key.length + pixPayload.key; // Chave PIX
        payload += '52040000'; // Indica valor do pagamento
        payload += '5303986'; // Código correspondente à moeda BRL
        payload += '5406' + pixPayload.amount.length + pixPayload.amount; // Valor do pagamento
        payload += '5802BR'; // Código do país
        payload += '5913' + pixPayload.name.length + pixPayload.name; // Nome do beneficiário/recebedor
        payload += '6007' + pixPayload.city.length + pixPayload.city; // Cidade
        payload += '62070503'; // Indica que é uma transação PIX
        payload += '6304' + pixPayload.transactionId; // Identificador da transação
        payload += '62' + pixPayload.description.length + pixPayload.description; // Descrição do pagamento
        console.log('Gerando o pix de pagamento');
        return payload;
    }
    // Função para gerar o QR code
    async generateQRCode(payment) {
        const pixPayload = {
            version: '1',
            key: 'chave_pix_recebedo',
            name: 'Fiap',
            city: 'São Paulo',
            transactionId: 'Transaction',
            amount: payment.price,
            description: 'Gerador da ordem de ' + payment.orderId
        };
        const payload = await this.generatePixPayload(pixPayload);
        this.qrData = '000201' + payload.length.toString().padStart(2, '0') + payload;
        return this.qrData;
    }
}
exports.default = PaymentUtil;
//# sourceMappingURL=paymentUtil.js.map