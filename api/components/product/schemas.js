/**
 * desired schemas for req.body
 */

const Joi = require("joi");
const categories = ['smartphones', 'tv', 'smartwatchs', 'laptops', 'videogames', 'pc-components'];

const productSchema = Joi.object({
    id_album: Joi.string().length(21).required(),
    title: Joi.string().min(10).max(70).required(),
    description: Joi.string().min(10).max(2000).required(),
    category: Joi.string().valid(...categories).required(),
    quantity: Joi.number().min(1).max(500).required(),
    price: Joi.number().positive().max(10000).required(),
    cover: Joi.string().required(),
    new: Joi.number().valid(0, 1).required()
});

const photoSchema = Joi.object({
    id_album: Joi.string().length(21).required(),
    photo_fullname: Joi.string().required(),
    photo_url: Joi.string().required()
})

module.exports = {
    productSchema,
    photoSchema
}