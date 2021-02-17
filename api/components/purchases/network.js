const router = require("express").Router();
const response = require("../../../network/response");
const controller = require('./index');
const { purchaseSchema } = require("./schemas");
// middlewares
const checkBodySchema = require("../../../network/schemaValidator");
const secureAction = require("./secure");

// routes
router.get('/:id_user', secureAction('get-purchases'), getUserPurchases);

router.post(
    '/buy',
    checkBodySchema(purchaseSchema),    
    secureAction('buy'),
    buyProduct
);

// routes handlers

// ===== GET ===== 

function getUserPurchases(req, res, next) {
    controller.getUserPurchases(req.params.id_user)
        .then( data => response.success(res, 200, data) )
        .catch(next);
}


// ===== POST =====
function buyProduct(req, res, next) {
    controller.makePurchase(req.body)
        .then( data => response.success(res, 200, data) )
        .catch(next);
}


// ===== DELETE =====


module.exports = router;
