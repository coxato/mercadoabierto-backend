const { nanoid } = require("nanoid");

const getDateStr = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
}

// data is prevously validate by "joi" library, check ./schemas.js

const Product = (body, id_user) => {
    return {
        ...body,
        id_user,
        id_product: nanoid(),
        avaliable: 1, // true 0 -> false
        date: getDateStr(),
    }
}

const ProductMedia = (body, id_user) => {
    return {
        ...body,
        id_user
    }
}

module.exports = {
    Product,
    ProductMedia
}