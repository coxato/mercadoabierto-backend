const router = require("express").Router();
const response = require("../../../network/response");
const controller = require('./index');
const { cartAddSchema, cartUpdateSchema, cartDeleteSchema } = require("./schemas");
// middlewares
const checkBodySchema = require("../../../network/schemaValidator");
const secureAction = require("./secure");

// routes
router.get("/:id_user", secureAction('get-cart'), getCartItems);

router.post(
    "/add-item", 
    checkBodySchema(cartAddSchema), 
    secureAction('is-owner'),
    addToCart
);
router.post(
    "/update-item", 
    secureAction('is-owner'), 
    checkBodySchema(cartUpdateSchema),
    updateCartItem
);

router.delete(
    "/delete-item",
    secureAction('is-owner'), 
    checkBodySchema(cartDeleteSchema),
    deleteCartItem
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

function updateCartItem(req, res, next) {
    controller.updateQty(req.body)
        .then( data => response.success(res, 200, data))
        .catch(next);
}


// ===== DELETE =====
function deleteCartItem(req, res, next) {
    controller.deleteItem(req.body)
        .then( data => response.success(res, 200, data))
        .catch(next);
}

module.exports = router;
