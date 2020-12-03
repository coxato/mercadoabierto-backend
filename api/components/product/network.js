const router = require("express").Router();
const response = require("@network/response");
const controller = require('./index');
// middlewares
const checkBodySchema = require("@network/schemaValidator");

// routes
router.get('/all', getAllProducts);
router.get('/:id', getProductById);

// routes handlers
function getAllProducts(req, res, next) {
    controller.getAllProducts()
        .then( data => response.success(res, 200, data) )
        .catch(next);
}

function getProductById(req, res, next) {
    controller.getProductById(req.params.id)
        .then( data => response.success(res, 200, data) )
        .catch(next);
}

module.exports = router;
