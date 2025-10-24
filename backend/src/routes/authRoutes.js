import express from "express";
import * as authController from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, (req, res) => {
  res.json({ user: { id: req.user.id, email: req.user.email } });
});
router.post("/logout", authController.logout);

export default router;