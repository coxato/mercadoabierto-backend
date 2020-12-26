const err = require("../../../utils/error");
const { Sale } = require("./models");
const TABLE = 'sale';

function productController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("../../../store/dummyDB");

    // ========== Read =========

    async function getUserSales(id_user) {
        
    }

    // ========== Create ==========

    

    // ========= delete ==========

    

    return {
        getUserSales
    }
    
}

module.exports = productController;