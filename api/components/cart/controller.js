const err = require("../../../utils/error");
const TABLE = 'cart';
const TABLE_PRODUCT = 'product';

function cartController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("../../../store/dummyDB");

    // ========== Read =========
    async function getUserItems(id_user) {
        // SELECT cart.*, cover, price, title FROM cart JOIN product ON cart.id_product=product.id_product WHERE cart.id_user='someIdUser'
        const items = await store.queryWithAdvanceJoin(
            TABLE, // cart
            'cart.*, title, price, cover', // SELECT
            { id_user }, // query
            { [TABLE_PRODUCT]: 'id_product' } // JOIN 
        );

        if(!items) return null;

        return items;
    }

    async function _getCartItem({ id_user, id_product }) {
        return await store.queryMultiple(TABLE, { id_user, id_product });
    }


    // ========== Create ==========
    async function addToCart(body) {
        let { id_user, id_product, quantity } = body;
        quantity = parseInt(quantity);

        const user = await store.query("user", { id_user });

        const product = await store.getValuesFrom(
            TABLE_PRODUCT,
            {id_product},
            ['id_product', 'price', 'cover', 'title']
        );

        const item = await _getCartItem(body);

        // do not allow auto buy
        if(product.id_user === id_user){
            return null;
        }

        // do not add if not enough money
        if(product.price * quantity > user.money){
            return null;
        }

        // add to cart
        if(!item){
            await store.insert(TABLE, body);
        }
        // sum quantity if exists
        else{
            await store.updateBy(
                TABLE, 
                { id_user, id_product },
                { quantity: item.quantity + quantity }    
            )
        }

        // return basic product data
        return product;
    }

    // ========= update ==========

    async function updateQty(body) {
        const { id_user, id_product, quantity } = body;

        const item = await _getCartItem(body);

        if(item){
            const itemQty = item.quantity;
            let qtyToUpdate = itemQty + parseInt(quantity);

            if((itemQty <= 0) || (qtyToUpdate <= 0)){
                return await deleteItem(body);
            }

            await store.updateBy(
                TABLE, 
                { id_user, id_product },
                { quantity: qtyToUpdate }   
            );

            return true;
            
        }
        // item does not exist
        return null;
    }

    // ========= delete ==========
    async function deleteItem(body) {
        const { id_user, id_product } = body;

        await store.removeByMultiple(TABLE, { id_user, id_product });
        
        return true;
    }
    

    return {
        getUserItems,
        addToCart,
        updateQty,
        deleteItem,
    }
    
}

module.exports = cartController;