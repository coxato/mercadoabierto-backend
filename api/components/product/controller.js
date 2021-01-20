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
        // if(!product) throw err("the product with id " + id + " does not exist", 404);
        if(!product){
            return {
                productData: null,
                photos: null
            };
        }

        const photos = await store.query(
            TABLE+'_media', 
            { id_album: product.id_album }, 
            null, 
            true
        );

        const sellerData = await store.getValuesFrom(
            'user',
            {id_user: product.id_user},
            ['id_user', 'username', 'photo_url']    
        )

        return {
            productData: product,
            photos,
            sellerData
        };
    }

    async function getProductsByCategory(category, sortBy = null) {
        const products = await store.query(TABLE, { category }, null, true);
        return products;
    }
 
    
    async function getProductMedia(id_album) {
        const media = await store.query(TABLE+'_media', { id_album }, null, true);
        return media;
    }

    // ========== Create ==========

    async function saveProductMedia(body, id_user) {
        const media = ProductMedia(body, id_user);

        await store.insert(TABLE+'_media', media);
        return 'product media saved';
    }

    async function saveProduct(body, id_user, username) {
        const product = Product(body, id_user);
        await store.insert(TABLE, product);
        return {
            ...product, 
            username
        };
    }

    // ================ update ==============
    async function updateProduct(id_product, propsObj) {
        return await store.update(TABLE, id_product, propsObj);
    }

    // ========= delete ==========

    async function removeProductMedia(photo_fullname) {
        await store.removeBy(TABLE+'_media', { photo_fullname });
        return 'product media removed';
    }

    return {
        // GET
        getAllProducts,
        getProductById,
        getProductsByCategory,
        getProductMedia,
        // POST
        saveProductMedia,
        saveProduct,
        // PUT
        updateProduct,
        // DELETE
        removeProductMedia,
        // misc
        store,
        TABLE
    }
    
}

module.exports = productController;