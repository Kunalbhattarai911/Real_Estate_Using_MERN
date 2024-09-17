import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const findUsername = await User.findOne({ username });
    if (findUsername) {
      return res.status(400).json({
        message: "This Username or Email is already registered.",
        success: false,
      });
    }

    const findemail = await User.findOne({ email });
    if (findemail) {
      return res.status(400).json({
        message: "This Username or Email is already registered.",
        success: false,
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "User Registration Successful.",
      status: true,
      newUser,
    });
  } catch (error) {
    console.log("Error Details", error);
    return res.status(500).json({
      message: "An Error Occured While Registration",
      success: false,
    });
  }
};
