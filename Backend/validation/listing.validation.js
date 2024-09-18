import Joi from 'joi';

export const listingValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        address: Joi.string().required(),
        regularPrice: Joi.number().required(),
        discountPrice: Joi.number().required(),
        bathrooms: Joi.number().required(),
        bedrooms: Joi.number().required(),
        furnished: Joi.boolean().required(),
        parking: Joi.boolean().required(),
        type: Joi.string().required(),
        offer: Joi.boolean().required(),
        imageUrls: Joi.array().items(Joi.string().uri()).required(),
        userRef: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details,
        });
    }
    next();
}
