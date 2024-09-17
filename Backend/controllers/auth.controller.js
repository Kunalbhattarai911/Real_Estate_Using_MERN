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
      success: false,
    });
  }
};


export const login = async (req,res) => {
    try {
        const {email, password} = req.body;

       
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message : "Email or Password is incorrect",
                success : false
            })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(404).json({
                message : "Email or Password is incorrect",
                success :false
            })
        }

        const token = jwt.sign(
            { email: user.email, _id: user._id }, 
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        )

        const userDetails = {
            _id : user._id,
            username : user.username,
            email : user.email
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: "Login Successful",
            success: true,
            token,
            userDetails
        })
    } catch (error) {
        console.log("Error Details:", error);
        return res.status(500).json({
            message : "An Error Occured While Logging the User",
            success : false
        })
    }
}
