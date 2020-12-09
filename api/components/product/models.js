const { nanoid } = require("nanoid");

// data is prevously validate by "joi" library, check ./schemas.js

const Product = (body, id_user) => {
    return {
        ...body,
        id_user,
        id_product: nanoid(),
        avaliable: 1, // true 0 -> false
        date: new Date().toLocaleDateString().split('/').reverse().join('-'),
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