const err = require("../../../utils/error");
const { Purchase } = require("./models");
// controllers
const userController = require("../user");
const productController = require("../product");
const cartController = require("../cart");

const TABLE = 'purchase';

function purchaseController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("../../../store/dummyDB");

    // ========== Read =========

    async function getUserPurchases(id_user) {
        
    }

    // ========== Create ==========

    function _simpleValidation({ buyer, product, seller, quantity}) {
        if(!buyer || !seller || !product.productData) throw err('buyer or seller or product does not exists', 404);

        if(product.productData.quantity < quantity) throw err('not enough product items', 400);

        if(buyer.id_user === seller.id_user) throw err("you can't buy yourself");

        // if the buyer hasn't enough money
        if( product.productData.price * quantity > buyer.money ){
            throw err('not enough money, sorry', 400);
        }

        return;
    }


    async function makePurchase(body) {
        const { id_product, id_user_buyer, quantity } = body;

        // get data from buyer and product
        const buyer = await userController.getUserById(id_user_buyer);
        const product = await productController.getProductById(id_product);
        const seller = await userController.getUserById(product?.productData?.id_user);

        _simpleValidation({ buyer, seller, product, quantity });

        const productTotalCost = product.productData.price * quantity;

        // subtract buyer money, then add money to seller
        await userController.updateUser(id_user_buyer, { money: buyer.money - productTotalCost });

        await userController.updateUser(seller.id_user, { money: seller.money + productTotalCost });

        // update product quantity
        await productController.updateProduct(
            id_product, 
            { 
                quantity: product.productData.quantity - quantity, 
                // set avaliability
                ...( product.productData.quantity - quantity === 0 && { avaliable: 0 })
            }
        );

        // remove item from cart
        await cartController.deleteItem({ id_user: id_user_buyer, id_product });
        
        // and finally save purchase in db
        await store.insert(TABLE, Purchase({ ...body, id_user_seller: seller.id_user }));
    }
    

    // ========= delete ==========

    

    return {
        getUserPurchases,
        makePurchase
    }
    
}

module.exports = purchaseController;