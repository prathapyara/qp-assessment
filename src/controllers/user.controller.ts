import { Request, Response } from "express";
import Grocery from "../models/grocery.model";
import Order from "../models/order.model";

export const getAvailableGroceries = async (req: Request, res: Response) => {
  try {
    const groceries = await Grocery.find({ stock: { $gt: 0 } });
    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const bookGroceries = async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body;
    let total = 0;

    const updatedItems = await Promise.all(
      items.map(async (item: { groceryId: string; quantity: number }) => {
        const grocery = await Grocery.findById(item.groceryId);
        if (!grocery || grocery.stock < item.quantity) {
          throw new Error(`Insufficient stock for item: ${item.groceryId}`);
        }
        grocery.stock -= item.quantity;
        await grocery.save();
        total += grocery.price * item.quantity;
        return { groceryId: item.groceryId, quantity: item.quantity };
      })
    );

    const order = new Order({ userId, items: updatedItems, total });
    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
