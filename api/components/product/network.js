const router = require("express").Router();
const response = require("../../../network/response");
const controller = require('./index');
const { photoSchema } = require("./schemas");
// middlewares
const checkBodySchema = require("../../../network/schemaValidator");
const secureAction = require("./secure");

// routes
router.get('/all', getAllProducts);
router.get('/:id', getProductById);
router.post('/media', secureAction('media'), checkBodySchema(photoSchema), saveMedia);

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

function saveMedia(req, res, next) {
    controller.saveProductMedia(req.body)
        .then( data => response.success(res, 200, data) )
        .catch(next);
}

module.exports = router;
