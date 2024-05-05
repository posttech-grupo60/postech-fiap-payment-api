import { Schema, model } from "mongoose";

export interface IPayment {
  id: string;
  orderId: string;
  price: number;
  qrCode: string;
  pay: boolean;
}

const paymentSchema = new Schema<IPayment>({
  id: { type: String,  index: true },
  orderId: { type: String, required: true},
  price: { type: Number, required: true },
  qrCode: { type: String, required: true },
  pay: { type: Boolean, required: true },
});

export const PaymentModel = model<IPayment>("Payment", paymentSchema);