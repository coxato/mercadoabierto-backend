/**
 * this is an example file for config.js
 * just fill the right values for your app and
 * rename this file to config.js
 */

module.exports = {
    api: {
        PORT: process.env.PORT || 5000,
        SECRET: process.env.SECRET || 'your secret string'
    },

    mysql: {
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_USER: process.env.DB_USER || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || '',
        DB_NAME: process.env.DB_NAME || 'your db name'
    },
}