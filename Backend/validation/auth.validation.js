import joi from "joi";

export const authSignup = (req,res,next) => {
    const schema = joi.object({
        username : joi.string().min(1).max(100).required(),
        email : joi.string().email().required(),
        password : joi.string().min(8).required()
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message : "Bad Request",
            error
        })
    }
    next();
}