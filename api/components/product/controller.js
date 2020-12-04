const err = require("../../../utils/error");
const TABLE = 'product';

function productController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("../../../store/dummyDB");

    async function getAllProducts() {
        const products = await store.list(TABLE);
        return products;
    }

    async function getProductById(id) {
        const product = await store.query(TABLE, { id_product: id });
        if(!product) throw err("the product with id " + id + " does not exist", 404);

        const photos = await store.query(
            TABLE+'_media', 
            { id_album: product.id_album }, 
            null, 
            true
        );

        return {
            productData: product,
            photos
        };
    }

    
    return {
        getAllProducts,
        getProductById
    }
    
}

module.exports = productController;