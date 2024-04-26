import { Schema, model } from "mongoose";

export interface IPayment {
  id: string;
  orderId: string;
  price: number;
  qrCode: string;
  payment: boolean;
}

const paymentSchema = new Schema<IPayment>({
  id: { type: String, unique: true, index: true },
  orderId: { type: String, required: true , unique: true},
  price: { type: Number, required: true },
  qrCode: { type: String, required: true },
  payment: { type: Boolean, required: true, unique: true },
});

export const PaymentModel = model<IPayment>("Payment", paymentSchema);