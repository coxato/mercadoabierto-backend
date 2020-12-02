const md5 = require("md5");
const { nanoid } = require("nanoid");

const User = (userData) => {
    const { first_name, last_name, username, email } = userData;

    return {
        first_name,
        last_name,
        username,
        email,
        photo_url: `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`,
        id_user: nanoid()
    }
}

module.exports = {
    User
}