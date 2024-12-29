import { Router } from "express";
import {
  getAvailableGroceries,
  bookGroceries,
} from "../controllers/user.controller";

const router = Router();

router.get("/groceries", getAvailableGroceries);
router.post("/orders", bookGroceries);

export default router;
