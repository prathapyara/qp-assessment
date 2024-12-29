import { Request, Response } from "express";
import Grocery from "../models/grocery.model";

export const addGrocery = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const grocery = new Grocery({ name, price, stock });
    await grocery.save();
    res.status(201).json({ message: "Grocery item added", grocery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGroceries = async (req: Request, res: Response) => {
  try {
    const groceries = await Grocery.find();
    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGrocery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const grocery = await Grocery.findByIdAndUpdate(id, updates, { new: true });
    if (!grocery) return res.status(404).json({ message: "Grocery not found" });
    res.status(200).json(grocery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGrocery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const grocery = await Grocery.findByIdAndDelete(id);
    if (!grocery) return res.status(404).json({ message: "Grocery not found" });
    res.status(200).json({ message: "Grocery deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
