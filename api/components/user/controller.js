const { User } = require("./model");
const err = require("@utils/error");
const TABLE = 'user';

function userController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("../../../store/dummyDB");

    async function createUser(userData) {
        const user = User(userData);
    }

    async function getAllUsers() {
        const users = await store.list(TABLE);
        return users;
    }

    return {
        getAllUsers
    }
    
}

module.exports = userController;