const router = require("express").Router();
const response = require("../../../network/response");
const controller = require('./index');
const { photoSchema, productSchema } = require("./schemas");
// middlewares
const checkBodySchema = require("../../../network/schemaValidator");
const secureAction = require("./secure");

// routes
router.get('/all', getAllProducts);
router.get('/:id', getProductById);
router.get('/media/:id_album', getProductMedia);

router.post('/', secureAction('create'), checkBodySchema(productSchema), saveProduct);
router.post('/media', secureAction('media'), checkBodySchema(photoSchema), saveMedia);

router.delete('/media/:photo_fullname', secureAction('media'), removeMedia);

// routes handlers

// ===== GET ===== 

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

function getProductMedia(req, res, next) {
    controller.getProductMedia(req.params.id_album)
        .then( data => response.success(res, 200, data) )
        .catch(next);
}

// ===== POST =====

function saveProduct(req, res, next) {
    // req.user.id_user becomes from secure middleware
    controller.saveProduct(req.body, req.user.id_user)
        .then( data => response.success(res, 200, data) )
        .catch(next);
}

function saveMedia(req, res, next) {
    // req.user.id_user becomes from secure middleware
    controller.saveProductMedia(req.body, req.user.id_user)
        .then( data => response.success(res, 200, data) )
        .catch(next);
}

// ===== DELETE =====

function removeMedia(req, res, next) {
    controller.removeProductMedia(req.params.photo_fullname)
        .then( data => response.success(res, 200, data) )
        .catch(next);
}

module.exports = router;
