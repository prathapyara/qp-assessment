import { Router } from "express";
import {
  getAvailableGroceries,
  bookGroceries,
} from "../controllers/user.controller";
import { verifyIsLoggedIn } from "../helper/verifiyIsAdmin";

const router = Router();

router.use(verifyIsLoggedIn);
router.get("/groceries", getAvailableGroceries);
router.post("/orders", bookGroceries);

export default router;
