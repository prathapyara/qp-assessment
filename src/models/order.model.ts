import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  items: { groceryId: string; quantity: number }[];
  total: number;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  items: [
    {
      groceryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grocery",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
