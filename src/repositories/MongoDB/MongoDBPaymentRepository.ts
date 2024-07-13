import Payment from "../../entity/payment";
import { IPayment, PaymentModel } from "./schemas/Payment";

export default class MongoDBPaymentrepository {

    async save(payment: Payment): Promise<Payment> {
       console.log("Parou aqui " + payment.id);
        await new PaymentModel(payment).save();
        return payment;
    }

    async update(orderId: string) :  Promise<Payment | null> {
        try {
          const payment = await this.findByPaymentToOrderId(orderId);
          payment.pay = payment.price > 30 ? false : true;
          console.log('Payment Id = ' + payment.id + " Dados = " + payment.pay) 
          const result = await PaymentModel.findOneAndUpdate({ id: payment.id }, payment);
          console.log("Dados " + result);
          return result ?  payment : null;
          
        } catch (error) {
          throw new Error("Erro ao atualizar pedido: " + error);
        }
    }

    async findByPaymentToOrderId(orderId: string): Promise<Payment> {
      const payment = await PaymentModel.findOne({ orderId : orderId });
      console.log('Payment' + payment);
      if (!payment) throw new Error("Payment to Order not found");
      return convertModelToObject(payment);
    }

   
}
const convertModelToObject = async (iPayment: IPayment) => {
  const payment = new Payment(iPayment.orderId, iPayment.price);
  payment.id = iPayment.id;
  payment.qrCode = iPayment.qrCode;
  payment.pay = iPayment.pay  
  return await payment;
}
