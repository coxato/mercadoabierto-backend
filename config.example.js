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

    // online db
    mysql: {
        DB_HOST: process.env.DB_HOST || 'mysql online service, like remotemysql.com',
        DB_USER: process.env.DB_USER || 'your db user',
        DB_PASSWORD: process.env.DB_PASSWORD || 'your db password',
        DB_NAME: process.env.DB_NAME || 'your db name'
    },

    // offline db, localhost
    mysqlOffline: {
        DB_HOST: process.env.DB_HOST || '',
        DB_USER: process.env.DB_USER || '',
        DB_PASSWORD: process.env.DB_PASSWORD || '',
        DB_NAME: process.env.DB_NAME || ''
    }
}