const { nanoid } = require("nanoid");

const getDateStr = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
}

// data is prevously validate by "joi" library, check ./schemas.js

const Purchase = ({ id_user_buyer, id_user_seller, id_product, quantity }) => {
    return {
        id_user_buyer,
        id_user_seller,
        id_product,
        quantity,
        id_purchase: nanoid(),
        date: getDateStr(),
    }
}

module.exports = {
    Purchase
}