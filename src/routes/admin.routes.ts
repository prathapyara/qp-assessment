import { Router } from "express";
import {
  addGrocery,
  getGroceries,
  updateGrocery,
  deleteGrocery,
} from "../controllers/admin.controller";
import { verifyIsAdmin,verifyIsLoggedIn } from "../helper/verifiyIsAdmin";

const router = Router();

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.post("/groceries", addGrocery);
router.get("/groceries", getGroceries);
router.put("/groceries/:id", updateGrocery);
router.delete("/groceries/:id", deleteGrocery);

export default router;
