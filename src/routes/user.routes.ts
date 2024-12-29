import { Router } from "express";
import {
  getAvailableGroceries,
  bookGroceries,
} from "../controllers/user.controller";
import { verifyIsLoggedIn } from "../helper/verifyAuthToken";

const router = Router();

router.use(verifyIsLoggedIn);
router.get("/groceries", getAvailableGroceries);
router.post("/orders", bookGroceries);

export default router;
