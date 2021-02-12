const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const err = require("../utils/error");
const { api: { SECRET } } = require("../config");

// ============== token functions =================

function jwtSing(payload) {
    return jwt.sign(payload, SECRET);
}


function jwtVerifyAndDecode(token) {
    return jwt.verify(token, SECRET); 
}

function getToken(bearerString){
    if(!bearerString) throw err("token not provided", 401)

    if(bearerString.indexOf("Bearer ") === -1){
        throw err("invalid token format", 401);
    }

    const token = bearerString.replace("Bearer ", "");
    return token;
}

// decode jwt token
function decodeHeader(req){
    const bearer = req.headers.authorization || '';
    const token = getToken(bearer);
    const decoded = jwtVerifyAndDecode(token);
    if(decoded){
        req.user = decoded
        return decoded;
    };
    return null;
}

const check = {
    // check token owner
    isOwner: function(req, ownerId, idProp = 'id_user'){
        const decoded = decodeHeader(req);
        // check if the token correspond to owner
        if(decoded[idProp] === ownerId){
            return; 
        }

        throw err("sorry, not authorized", 401);
    },

    // check if is logged
    logged: function(req){
        if(decodeHeader(req)){
            return;
        }

        throw err("user not logged", 401);
    }

}

// ================ bcrypt functions =================

async function encrypt(string) {
    const crypt = await bcrypt.hash(string, 7);
    return crypt;
}

async function compareCrypt(string, hash) {
    return await bcrypt.compare(string, hash); 
}

module.exports = {
    jwtSing,
    encrypt,
    compareCrypt,
    check
}