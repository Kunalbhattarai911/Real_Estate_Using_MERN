import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
      error: error.message,
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email or Password is incorrect",
        success: false,
      });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({
        message: "Email or Password is incorrect",
        success: false,
      });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    const userDetails = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login Successful",
        success: true,
        token,
        userDetails,
      });
  } catch (error) {
    console.log("Error Details:", error);
    return res.status(500).json({
      message: "An Error Occured While Logging the User",
      error: error.message,
      success: false,
    });
  }
};

export const google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );

      const userDetails = {
        _id: user._id,
        username: user.username,
        email: user.email,
      };

      return res
        .status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpsOnly: true,
          sameSite: "strict",
        })
        .json({
          message: "Login Successful",
          success: true,
          token,
          userDetails,
        });
    } else {
      const generatePassword =
        Math.random().toString(32).slice(-8) +
        Math.random().toString(32).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatePassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(32).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign(
        { email: newUser.email, _id: newUser._id },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );

      const userDetails = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      };

      return res
        .status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpsOnly: true,
          sameSite: "strict",
        })
        .json({
          message: "Login Successful",
          success: true,
          token,
          userDetails,
        });
    }
  } catch (error) {
    console.log("Error Details:", error);
    return res.status(500).json({
      message: "An Error Occured While login or signup using Google.",
      error: error.message,
      success: false,
    });
  }
};
