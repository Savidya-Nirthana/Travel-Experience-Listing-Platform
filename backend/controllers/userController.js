import users from "../models/user.model.js";
import genarateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = await genarateToken(res, {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
    return res.status(200).json({
      message: "Login successful",
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

export const userRegister = asyncHandler(async (req, res) => {
  const user = req.body;
  try {
    const isExist = await users.findOne({ email: user.email });
    if (isExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = await users.create({
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      dob: user.dob,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

export const verifyUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "user verified",
    email: res.user.user.email,
    firstname: res.user.user.firstname,
    lastname: res.user.user.lastname,
  });
});

export const logOutUser = asyncHandler((req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: `logout succesfull` });
});
