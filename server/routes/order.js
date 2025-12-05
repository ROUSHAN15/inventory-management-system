import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMyOrders, placeOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/my-orders", authMiddleware, getMyOrders);
router.post("/place", authMiddleware, placeOrder);

export default router;
