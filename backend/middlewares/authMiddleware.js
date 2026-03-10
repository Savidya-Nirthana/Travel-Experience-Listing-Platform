import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      res.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "User not authorized" });
    }
  } else {
    res.status(401).json({ message: "user not authorized token is not set" });
  }
};
