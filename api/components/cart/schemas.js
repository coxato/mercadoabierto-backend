/**
 * desired schemas for req.body
 */

const Joi = require("joi");

const cartSchema = Joi.object({
    id_user: Joi.string().length(21).required(),
    id_product: Joi.string().length(21).required(),
    quantity: Joi.number().min(1).max(200).required()
});

module.exports = {
    cartSchema
}