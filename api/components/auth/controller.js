const bcrypt = require("bcryptjs");
const err = require("@utils/error");
const auth = require("@auth");
const TABLE = 'auth';

function authController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("@store/dummyDB");

    async function createUserCredentials(userData, password){
        const { id_user, username, email } = userData;

        const encryptPassword = await bcrypt.hash(password, 7);

        return await store.insert(TABLE, { 
            id_user, 
            username, 
            email, 
            password: encryptPassword 
        });
    }

    return {
        createUserCredentials
    }
    
}

module.exports = authController;