const mysql = require("mysql");
const config = require("../config");
const asyncMysql = require("./asyncMysql");

const dbENV = config.dev ? config.mysqlOffline : config.mysql;

const dbConfig = {
    host: dbENV.DB_HOST,
    user: dbENV.DB_USER,
    password: dbENV.DB_PASSWORD,
    database: dbENV.DB_NAME
}

let connection;
let asyncDB;

function handleConnection() {
    connection = mysql.createConnection(dbConfig);

    return new Promise((resolve, reject) => {
        connection.connect( err => {
            if(err){
                console.error('[db error]', err);
                // try to connect again
                setTimeout( handleConnection, 2000);
            }else{
                console.log('mysql db connected');
                asyncDB = asyncMysql(connection);
                resolve();
            }
        })
    
        connection.on('error', err => {
            console.error('[de error]', err);
            if(err.code === 'PROTOCOL CONNECTION LOST'){
                // try again if is network error
                handleConnection();
            }
            else{
                throw err;
            }
        });
    })
}


// mini utils
const concatenateQueries = (queryObj) => {
    const keys = Object.keys(queryObj);
    let q = '';

    for (let i = 0; i < keys.length; i++) {
        q += ` ${keys[i]}='${queryObj[keys[i]]}'`;
        
        if( (i+1) < keys.length ) q+= ' AND'
    }

    return q;
} 

// ===== crud functions =====

async function getValuesFrom(table, query, values = [], toArray = false){
    const _values = `${values.join()}`;
    const q = `SELECT ${_values} FROM ${table} WHERE ?`;
    const results = await asyncDB.query(q, query);
    
    if(results.length <= 1 && !toArray) return results[0]
    
    return results;
}

async function getWithLimit(table, columName, query, limit) {
    const q = `SELECT ${columName} FROM ${table} WHERE ? LIMIT ${limit}`;
    return await asyncDB.query(q, query);
}

async function query(table, query, join = null, toArray = false){
    let queryJoin = '';

    if(join){
        if(typeof join === "object"){
            const key = Object.keys(join)[0];
            const value = join[key];
            queryJoin = `JOIN ${key} ON ${table}.${value} = ${key}.id_${key}`;
        }
        else if(typeof join === "string"){
            queryJoin = join;
        }
    }

    const q = `SELECT * FROM ${table} ${queryJoin} WHERE ${table}.?`;
    
    try {
        const data = await asyncDB.query(q, query);
        const length = data.length;
        // return first element
        if(length <= 1 && !toArray) return data[0];
        // return data array
        return data;

    } catch (err) { throw err }
}


async function queryMultiple(table, queryObj, toArray = false) {
    let q = `SELECT * FROM ${table} WHERE`;
    q += concatenateQueries(queryObj);

    const data = await asyncDB.query(q);
    
    if(data.length <= 1 && !toArray) return data[0];
    // return data array
    return data;
}


async function insert(table, data){
    const q = `INSERT INTO ${table} SET ?`;
    return await asyncDB.query(q, data);
}

async function update(table, id, newData){
    const q = `UPDATE ${table} SET ? WHERE id_${table}=?`;
    return await asyncDB.query(q, [newData, id]);
}

async function updateBy(table, queryObj, newData){
    let q = `UPDATE ${table} SET ? WHERE`;
    q += concatenateQueries(queryObj);

    return await asyncDB.query(q, newData);
}

async function remove(table, id){
    const q = `DELETE FROM ${table} WHERE id=${id}`;
    return await asyncDB.query(q);
}

async function removeBy(table, query){
    const q = `DELETE FROM ${table} WHERE ?`;
    return await asyncDB.query(q, query);
}



module.exports = {
    getValuesFrom,
    getWithLimit,
    query,
    queryMultiple,
    insert,
    update,
    updateBy,
    remove,
    removeBy,
    handleConnection
}