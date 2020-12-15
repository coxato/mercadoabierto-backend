const err = require("../../../utils/error");
const TABLE = 'cart';

function cartController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("../../../store/dummyDB");

    // ========== Read =========
    async function getUserItems(id_user) {
        const items = await store.query(
            TABLE, // cart
            { id_user }, // query
            { 'product': 'id_product' }, // join 
            true // to array true
        );

        if(!items) return null;

        return items;
    }
    

    // ========== Create ==========
    async function addToCart(body) {
        const { id_user, id_product, quantity } = body;

        // do not allow auto buy
        const product = await store.query('product', { id_product });
        if(product.id_user === id_user){
            return null;
        }

        const item = await store.queryMultiple(TABLE, { id_user, id_product });

        // add to cart
        if(!item){
            await store.insert(TABLE, body);
            return true;
        }

        // add quantity if exists
        await store.updateBy(
            TABLE, 
            { id_user, id_product },
            { quantity: item.quantity + quantity }    
        )

        return true;
    }
    

    // ========= delete ==========

    

    return {
        getUserItems,
        addToCart
    }
    
}

module.exports = cartController;