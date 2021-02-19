const { User } = require("./model");
const err = require("../../../utils/error");
const auth = require("../auth");
const { USER_TABLE } = require("../../../store/constants");

function userController(injectedStore) {
    
    // set store
    let store;
    if(injectedStore) store = injectedStore;
    else store = require("../../../store/dummyDB");

    /*
        ===== create =====
    */
    async function createUser(body) {
        const emailTaken = await store.query(USER_TABLE, { email: body.email });
        if(emailTaken) throw err(`email ${body.email} is already in use`, 400);

        const usernameTaken = await store.query(USER_TABLE, { username: body.username });
        if(usernameTaken) throw err(`username ${body.username} is already in use`, 400);

        // save user
        const user = User(body);
        await store.insert(USER_TABLE, user);
        
        // create and save user credentials
        await auth.createUserCredentials(user, body.password);

        return 'user created succesfully';
    }

    /*
        ===== read =====
    */

    async function getAllUsers() {
        const users = await store.list(USER_TABLE);
        return users;
    }

    async function _getUser(where, privateInfo = false) {
        let user;

        if(privateInfo){
            user = await store.query(USER_TABLE, where);
        }else{
            user = await store.getValuesFrom(
                USER_TABLE, 
                where, 
                ['username', 'photo_url', 'first_name', 'last_name']
            );
        }

        if(!user) return null;

        return user;
    }


    async function getUserById(id_user, privateInfo = false) {
        return await _getUser({ id_user }, privateInfo);
    }

    async function getUserByUsername(username) {
        username = username.toLowerCase();
        return await _getUser({ username });
    }

    async function getUserMoney(id_user) {
        const { money } = await store.getValuesFrom(
            USER_TABLE, 
            { id_user }, 
            ['money']
        );

        return money;
    }

    // username or email is avaliable
    async function isAvaliable(searchBy, valueToSearch) {
        if(searchBy !== 'email' && searchBy !== 'username') throw err('searchBy invalid query', 400);

        const userExist = await store.query(USER_TABLE, {[searchBy]: valueToSearch});
        return userExist ? false : true;
    }

    /*
        ===== update =====
    */

    async function updateUser(id_user, propsObj) {
        return await store.update(USER_TABLE, id_user, propsObj);
    }

    
    return {
        getAllUsers,
        getUserById,
        getUserByUsername,
        getUserMoney,
        createUser,
        isAvaliable,
        updateUser
    }
    
}

module.exports = userController;