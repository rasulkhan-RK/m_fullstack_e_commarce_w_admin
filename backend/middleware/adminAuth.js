import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorised Login Again",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token decode", token_decode);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized " });
    }
    next();
  } catch (error) {
    console.log("Error in adminAuth: ", error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
