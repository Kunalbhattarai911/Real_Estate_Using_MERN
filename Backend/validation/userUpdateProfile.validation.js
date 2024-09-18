import joi from "joi";

export const updateUserProfile = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().min(1).max(100),
    email: joi.string().email(),
    password: joi.string().min(8),
    avatar:joi.string()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      error,
    });
  }
  next();
};
