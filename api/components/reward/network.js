const router = require("express").Router();
const response = require("../../../network/response");
const controller = require('./index');
// middlewares
const secure = require("./secure");

// routes
router.get('/check', secure('reward'), checkReward);
router.get('/give', secure('reward'), giveReward);

// routes handlers
function checkReward(req, res, next) {
    controller.checkReward(req.user.id_user)
        .then( data => response.success(res, 200, data) )
        .catch(next);
}

function giveReward(req, res, next) {
    controller.giveReward(req.user.id_user)
        .then( () => response.success(res, 200, 'reward given') )
        .catch(next);
}

module.exports = router;
