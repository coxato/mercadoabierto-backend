const { User } = require("./model");
const err = require("@utils/error");
const auth = require("../auth");
const TABLE = 'user';

function userController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("@store/dummyDB");


    async function createUser(body) {
        const emailTaken = await store.query(TABLE, { email: body.email });
        if(emailTaken) throw err(`email ${body.email} is already in use`, 400);

        const usernameTaken = await store.query(TABLE, { username: body.username });
        if(usernameTaken) throw err(`username ${body.username} is already in use`, 400);

        // save user
        const user = User(body);
        await store.insert(TABLE, user);
        
        // create and save user credentials
        await auth.createUserCredentials(user, body.password);

        return 'user created succesfully';
    }


    async function getAllUsers() {
        const users = await store.list(TABLE);
        return users;
    }

    
    return {
        getAllUsers,
        createUser
    }
    
}

module.exports = userController;