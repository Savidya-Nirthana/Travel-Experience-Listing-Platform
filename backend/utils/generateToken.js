import jwt from "jsonwebtoken";
const genarateToken = (res, user) => {
  let token;
  token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  try {
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return token;
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
};

export default genarateToken;
