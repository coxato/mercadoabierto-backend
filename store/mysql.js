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
            console.error('[db error]', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST'){
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
const _concatenateQueries = (queryObj) => {
    const keys = Object.keys(queryObj);
    let q = '';

    for (let i = 0; i < keys.length; i++) {
        q += ` ${keys[i]}='${queryObj[keys[i]]}'`;
        
        if( (i+1) < keys.length ) q+= ' AND'
    }

    return q;
} 

const _makeJoinStr = (table, joinObj) => {
    let queryJoin = '';

    if(joinObj){
        if(typeof joinObj === "object"){
            const key = Object.keys(joinObj)[0];
            const value = joinObj[key];
            queryJoin = `JOIN ${key} ON ${table}.${value} = ${key}.id_${key}`;
        }
        else if(typeof joinObj === "string"){
            queryJoin = joinObj;
        }
    }

    return queryJoin;
}

// ===== crud functions =====

// ===== get =====
async function list(table) {
    const q = `SELECT * FROM ${table}`;
    return await asyncDB.query(q);
}

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
    const queryJoin = _makeJoinStr(table, join);

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
    q += _concatenateQueries(queryObj);

    const data = await asyncDB.query(q);
    
    if(data.length <= 1 && !toArray) return data[0];
    // return data array
    return data;
}

async function queryWithAdvanceJoin(table, selectRows, query, join, toArray = true) {
    const joinStr = _makeJoinStr(table, join);
    
    const q = `SELECT ${selectRows} FROM ${table} ${joinStr} WHERE ${table}.?`;
    
    const data = await asyncDB.query(q, query);

    if(data.length <= 1 && !toArray) return data[0];

    return data;
}


async function getCount(table, where = null) {
    let q = `SELECT COUNT(id_${table}) AS dataCount FROM ${table}`;
    let data;

    if(where){
        q += ' WHERE ?';
        data = await asyncDB.query(q, where);
    }
    else data = await asyncDB.query(q); 

    return data[0].dataCount;
}


async function getWithPagination({table, limit, orderBy, offset, order = 'ASC', where = null}) {
    let q = `SELECT * FROM ${table}`; 
    let q2 = ` ORDER BY ${orderBy} ${order} LIMIT ${limit} OFFSET ${offset}`;
    let data;
    

    if(where){
        q += ' WHERE ?' + q2;
        data = await asyncDB.query(q, where);
    }
    else data = await asyncDB.query(q + q2); 

    return data;
}

// ===== insert =====

async function insert(table, data){
    const q = `INSERT INTO ${table} SET ?`;
    return await asyncDB.query(q, data);
}

// ===== update =====

async function update(table, id, newData){
    const q = `UPDATE ${table} SET ? WHERE id_${table}=?`;
    return await asyncDB.query(q, [newData, id]);
}

async function updateBy(table, queryObj, newData){
    let q = `UPDATE ${table} SET ? WHERE`;
    q += _concatenateQueries(queryObj);

    return await asyncDB.query(q, newData);
}

// ===== delete =====

async function remove(table, id){
    const q = `DELETE FROM ${table} WHERE id=${id}`;
    return await asyncDB.query(q);
}

async function removeBy(table, query){
    const q = `DELETE FROM ${table} WHERE ?`;
    return await asyncDB.query(q, query);
}

async function removeByMultiple(table, queryObj){
    let q = `DELETE FROM ${table} WHERE`;
    q+= _concatenateQueries(queryObj);

    return await asyncDB.query(q);
}


module.exports = {
    list,
    getValuesFrom,
    getWithLimit,
    query,
    queryMultiple,
    queryWithAdvanceJoin,
    getCount,
    getWithPagination,
    insert,
    update,
    updateBy,
    remove,
    removeBy,
    removeByMultiple,
    handleConnection
}