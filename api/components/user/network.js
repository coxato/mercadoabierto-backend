const router = require("express").Router();
const response = require("@network/response");
const controller = require('./index');
// middlewares
// const { checkReqBody } = require("@network/checkBodyMiddleware");

// routes
router.get('/', getAllUsers);
router.post('/', createUser);

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
