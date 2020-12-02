const md5 = require("md5");
const { nanoid } = require("nanoid");

const User = (body) => {
    const { first_name, last_name, username, email } = body;

    return {
        photo_url: `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`,
        id_user: nanoid(),
        money: 1000.00,
        first_name,
        last_name,
        username: username.trim(),
        email: email.trim(),
    }
}

module.exports = {
    User
}