import bcrypt from 'bcryptjs'; 
import User from '../models/user.model.js';

export const updateUserInfo = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            avatar
        } = req.body;

        const userId = req.id; // Middleware authentication

        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }


        const useremail = await User.findOne({ email });
        if (useremail && useremail._id.toString() !== userId.toString()) {
            return res.status(400).json({
                message: "This Email is already registered.",
                success: false
            });
        }

       
        if (username) user.username = username;
        if (email) user.email = email;
        if(avatar) user.avatar = avatar;

        
        if (password) {
            const salt = await bcrypt.genSalt(10); 
            const hashedPassword = await bcrypt.hash(password, salt); 
            user.password = hashedPassword;
        }

        await user.save(); 

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }

        return res.status(201).json({
            message: "User Profile Updated Successfully.",
            success: true,
            user
        });

    } catch (error) {
        console.log("Error Details", error);
        return res.status(500).json({
            message: "An error occurred while updating the user profile.",
            error: error.message,
            success: false
        });
    }
}
