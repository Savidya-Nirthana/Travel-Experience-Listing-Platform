import experience from "../models/experience.model.js";
import asyncHandler from "express-async-handler";
import { uploadWebContentMiddleware } from "../middlewares/uploadWebContentMiddleware.js";

export const createListing = asyncHandler(async (req, res) => {
  const { title, location, image, description, price } = req.body;
  const email = res.user.user.email;
  try {
    const newListing = await experience.create({
      email,
      title,
      location,
      image,
      description,
      price,
    });
    res.status(201).json({ message: "Listing created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const fetchExperiences = asyncHandler(async (req, res) => {
  try {
    const experiences = await experience.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "email",
          foreignField: "email",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          location: 1,
          image: 1,
          description: 1,
          price: 1,
          createdAt: 1,
          updatedAt: 1,
          creatername: {
            $concat: ["$userInfo.firstname", " ", "$userInfo.lastname"],
          },
        },
      },
    ]);

    res.status(200).json(experiences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const updateExperiences = asyncHandler(async (req, res) => {
  const { title, location, image, description, price, id } = req.body;
  try {
    const updated = await experience.findByIdAndUpdate(
      id,
      { title, location, image, description, price },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({ message: "Updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }
  const buffer = req.file;
  const folder = `web/static`;
  const result = await uploadWebContentMiddleware(buffer, folder);
  return res.status(200).json({ path: result });
});

export const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const deleted = await experience.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
