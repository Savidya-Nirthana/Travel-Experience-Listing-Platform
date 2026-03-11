import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createListing,
  fetchExperiences,
  updateExperiences,
  uploadImage,
  deleteListing,
} from "../controllers/listingController.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/create", protect, createListing);
router.post("/fetch", protect, fetchExperiences);
router.post("/update", protect, updateExperiences);
router.post("/uploadImage", protect, upload.single("file"), uploadImage);
router.post("/deleteListing", protect, deleteListing);

export default router;
