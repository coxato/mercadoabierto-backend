const err = require("../utils/error");

function checkBodySchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if(error){
            throw err(error.message, 400);
        }

        next();
    }
}

module.exports = checkBodySchema;