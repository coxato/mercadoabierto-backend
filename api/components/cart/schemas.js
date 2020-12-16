/**
 * desired schemas for req.body
 */

const Joi = require("joi");

const cartAddSchema = Joi.object({
    id_user: Joi.string().length(21).required(),
    id_product: Joi.string().length(21).required(),
    quantity: Joi.number().min(1).max(200).required()
});

const cartUpdateSchema = Joi.object({
    id_user: Joi.string().length(21).required(),
    id_product: Joi.string().length(21).required(),
    quantity: Joi.number().integer().required()
});

const cartDeleteSchema = Joi.object({
    id_user: Joi.string().length(21).required(),
    id_product: Joi.string().length(21).required()
});

module.exports = {
    cartAddSchema,
    cartUpdateSchema,
    cartDeleteSchema
}