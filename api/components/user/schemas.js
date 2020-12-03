const Joi = require("joi");

const userSchema = Joi.object({
    first_name: Joi.string().min(2).required(),
    last_name: Joi.string().required(),
    username: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

module.exports = {
    userSchema
}