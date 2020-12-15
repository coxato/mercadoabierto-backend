const router = require("express").Router();
const response = require("../../../network/response");
const controller = require('./index');
const { cartSchema } = require("./schemas");
// middlewares
const checkBodySchema = require("../../../network/schemaValidator");
const secureAction = require("./secure");

// routes
router.get("/:id_user", secureAction('get-cart'), getCartItems);

router.post(
    "/add", 
    checkBodySchema(cartSchema), 
    secureAction('add-to-cart'),
    addToCart
)

// routes handlers

// ===== GET ===== 
function getCartItems(req, res, next) {
    controller.getUserItems(req.params.id_user)
        .then( data => response.success(res, 200, data))
        .catch(next);
}

// ===== POST =====
function addToCart(req, res, next) {
    controller.addToCart(req.body)
        .then( data => response.success(res, 200, data))
        .catch(next);
}


// ===== DELETE =====


module.exports = router;
