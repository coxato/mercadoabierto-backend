const err = require("../../../utils/error");
const { Purchase } = require("./models");

const TABLE = 'purchase';
const USER_TABLE = 'user';
const PRODUCT_TABLE = 'product';


function productController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("../../../store/dummyDB");

    // ========== Read =========

    async function getUserPurchases(id_user) {
        
    }

    // ========== Create ==========

    function _simpleValidation({ buyer, product, seller, quantity}) {
        if(!buyer || !seller || !product) throw err('buyer or seller or product does not exists', 404);

        if(product.quantity < quantity) throw err('not enough product items', 400);

        if(buyer.id_user === seller.id_user) throw err("you can't buy yourself");

        // if the buyer hasn't enough money
        if( product.price * quantity > buyer.money ){
            throw err('not enough money, sorry', 400);
        }

        return;
    }

    async function makePurchase(body) {
        const { id_product, id_user_buyer, quantity } = body;

        // get data from buyer and product
        const buyer = await store.query(USER_TABLE, { id_user: id_user_buyer });;
        const product = await store.query(PRODUCT_TABLE, { id_product });
        const seller = await store.query(USER_TABLE, { id_user: product?.id_user });;

        _simpleValidation({ buyer, seller, product, quantity });

        const productTotalCost = product.price * quantity;

        // subtract buyer money, then add money to seller
        await store.update(USER_TABLE, id_user_buyer, { money: buyer.money - productTotalCost });

        await store.update(USER_TABLE, seller.id_user, { money: seller.money + productTotalCost });

        // update product quantity
        await store.update(
            PRODUCT_TABLE, 
            id_product, 
            { 
                quantity: product.quantity - quantity, 
                // set avaliability
                ...( product.quantity - quantity === 0 && { avaliable: 0 })
            }
        );
        
        // save purchase in db
        await store.insert(TABLE, Purchase({ ...body, id_user_seller: seller.id_user }));
    }
    

    // ========= delete ==========

    

    return {
        getUserPurchases,
        makePurchase
    }
    
}

module.exports = productController;