const router = require("express").Router();
const response = require("../../../network/response");
const controller = require('./index');
const { saleSchema } = require("./schemas");
// middlewares
const checkBodySchema = require("../../../network/schemaValidator");
const secureAction = require("./secure");

// routes
router.get('/:id', secureAction('get-sales'), getUserSales);

// routes handlers

// ===== GET ===== 

function getUserSales(req, res, next) {
    controller.getUserSales(req.params.id_user)
        .then( data => response.success(res, 200, data) )
        .catch(next);
}


// ===== POST =====



// ===== DELETE =====


module.exports = router;
