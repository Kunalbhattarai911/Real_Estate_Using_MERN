import { json } from 'express';
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


export const updateListingValidator = (req,res,next) => {
    const schema = Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        address: Joi.string(),
        regularPrice: Joi.number(),
        discountPrice: Joi.number(),
        bathrooms: Joi.number(),
        bedrooms: Joi.number(),
        furnished: Joi.boolean(),
        parking: Joi.boolean(),
        type: Joi.string(),
        offer: Joi.boolean(),
        imageUrls: Joi.array().items(Joi.string().uri()),
        userRef: Joi.string()
    })

    const {error} = schema.validate (req.body) 
    if(error) {
        return res.status(400),json({
            message : "Bad Request",
            error: error.details
        })
    }
    next();
}