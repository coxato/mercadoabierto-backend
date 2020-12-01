const { promisify } = require("util");

function asyncMysql(connection){
    return {
        query: promisify(connection.query).bind(connection)
    }
}

module.exports = asyncMysql;

