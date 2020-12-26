/**
 * desired schemas for req.body
 */

const Joi = require("joi");

const saleSchema = Joi.object({
    id_user_buyer: Joi.string().length(21).required(),
    id_product: Joi.string().length(21).required(),
    quantity: Joi.number().positive().required()
});

module.exports = {
    saleSchema
}