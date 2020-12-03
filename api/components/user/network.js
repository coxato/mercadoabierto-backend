const router = require("express").Router();
const response = require("@network/response");
const controller = require('./index');
const { userSchema } = require("./schemas");
// middlewares
const checkBodySchema = require("@network/schemaValidatorMiddleware");

// routes
router.get('/', getAllUsers);
router.post('/', checkBodySchema(userSchema), createUser);

// routes handlers
function getAllUsers(req, res, next) {
    controller.getAllUsers()
        .then( data => response.success(res, 200, data) )
        .catch(next);
}

function createUser(req, res, next) {
    controller.createUser(req.body)
        .then( data => response.success(res, 200, data) )
        .catch(next);
}

module.exports = router;
