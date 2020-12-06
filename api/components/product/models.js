const { nanoid } = require("nanoid");

// data is prevously validate by "joi" library, check ./schemas.js

const Product = (body, id_user) => {
    return {
        ...body,
        id_user,
        id_product: nanoid()
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