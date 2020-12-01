const router = require("express").Router();
const response = require("@network/response");
const controller = require('./index');

// routes
router.get('/', getAllUsers);

// routes handlers
function getAllUsers(req, res, next) {
    controller.getAllUsers()
        .then( data => response.success(res, 200, data) )
        .catch(next);
}

module.exports = router;
