const err = require("../../../utils/error");
const { Product, ProductMedia } = require("./models");
const TABLE = 'product';

function productController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("../../../store/dummyDB");

    // ========== Read =========

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

    async function getProductMedia(id_album) {
        const media = store.query(TABLE+'_media', { id_album }, null, true);
        return media;
    }

    // ========== Create ==========

    async function saveProductMedia(body) {
        const productMedia = ProductMedia(body);
        
        await store.insert(TABLE+'_media', productMedia);
        return 'product media saved';
    }

    async function removeProductMedia(photo_fullname) {
        await store.removeBy(TABLE+'_media', { photo_fullname });
        return 'product media removed';
    }

    return {
        getAllProducts,
        getProductById,
        getProductMedia,
        saveProductMedia,
        removeProductMedia
    }
    
}

module.exports = productController;