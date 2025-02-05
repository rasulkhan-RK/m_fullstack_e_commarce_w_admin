import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin Feautures
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", auth, placeOrder);
orderRouter.post("/stripe", auth, placeOrderStripe);
orderRouter.post("/razorpay", auth, placeOrderRazorPay);

// User Features
orderRouter.post("/userorders", auth, userOrders);

// Verify Payment
orderRouter.post("/verifyStripe", auth, verifyStripe);
orderRouter.post("/verifyRazorpay", auth, verifyRazorpay);

export default orderRouter;
