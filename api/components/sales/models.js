const { nanoid } = require("nanoid");

const getDateStr = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
}

// data is prevously validate by "joi" library, check ./schemas.js

const Sale = ({ id_user_buyer, id_user_seller, id_product, quantity, earned_money }) => {
    return {
        id_user_buyer,
        id_user_seller,
        id_product,
        quantity,
        earned_money,
        id_sale: nanoid(),
        date: getDateStr(),
    }
}

module.exports = {
    Sale
}