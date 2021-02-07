const router = require("express").Router();
const response = require("../../../network/response");
const controller = require('./index');
const { photoSchema, productSchema } = require("./schemas");
// middlewares
const checkBodySchema = require("../../../network/schemaValidator");
const paginationMiddleware = require("../../../network/paginationMiddleware");
const secureAction = require("./secure");

// routes
router.get('/all', getAllProducts);
router.get(
    '/category/:category', 
    handleProductsCategories, 
    getProductsWithPagination
);
router.get(
    '/search', 
    handleProductsBySearch, 
    getProductsWithPagination
);
router.get(
    '/search-text-suggestions', 
    handleAutoCompleteSearch, 
    getAutoCompleteSuggestions
);

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

function handleProductsCategories(req, res, next) {
    const { category } = req.params;
    const { filter } = req.query;
    const _new = !filter ? undefined : filter === 'new' ? 1 : 0;
    // make a little verification for :category param
    paginationMiddleware({
        store: controller.store,
        table: controller.TABLE,
        where: category === 'all' ? 
                null 
                : 
                { 
                    category,
                    avaliable: 1,
                    // expect a number 
                    ...( !isNaN(_new) && { new: _new }) 
                }
    })(req, res, next);
}


function handleProductsBySearch(req, res, next) {
    const { search, filter } = req.query;
    const _new = !filter ? undefined : filter === 'new' ? 1 : 0;

    paginationMiddleware({
        store: controller.store,
        table: controller.TABLE,
        where: { 
            title: search,
            avaliable: 1,
            // expect a number 
            ...( !isNaN(_new) && { new: _new }) 
        },
        haveRegex: true
    })(req, res, next);
}


function handleAutoCompleteSearch(req, res, next) {
    paginationMiddleware({
        store: controller.store,
        table: controller.TABLE,
        where: { title: req.query.search, avaliable: 1 },
        haveRegex: true
    })(req, res, next);
}

function getAutoCompleteSuggestions(req, res) {
    if(req.paginationResults){
        const results = req
                .paginationResults
                .results
                .slice(0, req.query.maxSuggestions || 5)
                .map( product => product.title );
        
        response.success(res, 200, results);
    }
    else{
        response.error(res, new Error("error getting products suggestions"))
    }
}


function getProductsWithPagination(req, res) {
    if(req.paginationResults){
        response.success(res, 200, req.paginationResults)
    }
    else{
        response.error(res, new Error("error getting products with pagination"))
    }
}

// ===== POST =====

function saveProduct(req, res, next) {
    // req.user.id_user becomes from secure middleware
    controller.saveProduct(req.body, req.user.id_user, req.user.username)
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
