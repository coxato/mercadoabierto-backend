const router = require("express").Router();
const response = require("@network/response");
const controller = require('./index');

// routes
router.login('/login', login);

// routes handlers
function login(req, res, next) {
    controller.login(req.body)
        .then( data => response.success(res, 201, data) )
        .catch(next);
}

module.exports = router;
