import express from "express";
import { userLogin, userRegister, verifyUser, logOutUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/login",  userLogin)
router.post("/register",  userRegister)
router.post("/verify", protect, verifyUser);
router.post("/logOut", protect, logOutUser);

export default router;
