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

export const deleteUser = async(req,res) => {
    try {
        const { id } = req.params;

        const user = await User.findById (id);

        if(!user) {
            return res.status(404).json({
                message : "User Not Found.",
                success : false
            })
        }

        await user.deleteOne();

        return res.status(200).clearCookie('token').json({
            message : "user deleted successfull.",
            success : true
        })
    } catch (error) {
        console.log("Error Details:",error);
        return res.status(500).json({
            message : "An Error Occured while deleting the user",
            error : error.message,
            success : false
        })
    }
}

export const getUser = async(req,res) => {
 try {
    const { id }= req.params;

    const userData = await User.findById({_id : id})

    if(!userData){
        return res.status(404).json({
            message : "user not found",
            success : false
        })
    }

const {password : pass, ...rest} = userData._doc;

    return res.status(200).json({
        message : "user data",
        success : true,
        ...rest
    })
 }catch (error) {
    console.log("Error Details:",error);
    return res.status(500).json({
        message : "An Error Occured while retriving the user",
        error : error.message,
        success : false
    })
}
}