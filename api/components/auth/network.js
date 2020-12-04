const router = require("express").Router();
const response = require("../../../network/response");
const controller = require('./index');

// routes
router.post('/login', login);

// routes handlers
function login(req, res, next) {
    controller.login(req.body)
        .then( token => response.success(res, 201, token) )
        .catch(next);
}

module.exports = router;
