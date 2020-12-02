const { User } = require("./model");
const err = require("@utils/error");
const { checkProps } = require("@utils/checkObjProps");
const auth = require("../auth");
const TABLE = 'user';

function userController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("@store/dummyDB");


    async function createUser(body) {
        // check body props
        const propsToValidate = ['username', 'email', 'first_name', 'last_name', 'password'];
        if(!checkProps(false, body, propsToValidate)) throw err('the body is missing values', 400);

        // check password length, email and username

        if(body.password.length < 8) throw err('password must have 8 characters', 400);

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