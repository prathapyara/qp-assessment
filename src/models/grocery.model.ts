import mongoose, { Schema, Document } from "mongoose";

export interface IGrocery extends Document {
  name: string;
  price: number;
  stock: number;
}

const GrocerySchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export default mongoose.model<IGrocery>("Grocery", GrocerySchema);
