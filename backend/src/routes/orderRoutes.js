import express from "express";
import * as orderController from "../controllers/orderController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, orderController.submitOrder);
router.get("/my-orders", authenticate,  orderController.fetchUserOrders);

export default router;
