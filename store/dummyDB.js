const err = require("../utils/error");

const db = {
    'user': [
        { id: '1', name: 'Carlos' }
    ]
};

async function list(table){
    return db[table];
}

async function get(table, id){
    return await db[table].find( item => item.id === id);
}

async function getBy(table, searchBy, compareData){
    return await db[table].find( item => item[searchBy] === compareData );
}

async function query(table, objectData){
    if(!db[table]) throw err("table " + table + " does not exist", 404);

    const keys = Object.keys(objectData);
    
    const data = db[table].find( item => {
        let isEqual = true;
        for(let key of keys){
            if(objectData[key] !== item[key]){
                isEqual = false
                break;
            };
        }

        return isEqual;
    });

    return data;
}

async function insert(table, data){
    if( !db[table] ) db[table] = [];
    return await db[table].push(data); 
}

async function remove(table, id){
    const arr = await list(table);
    const index = arr.findIndex( item => item.id === id);
    
    if(index === -1) return null;
    
    arr.splice(index, 1);
    return id;
}

async function update(table, id, newData){
    const arr = await list(table);
    const index = arr.findIndex( item => item.id === id);
    
    if(index !== -1){
        db[table][index] = newData;
    }

    return null;
}

module.exports = {
    list,
    get,
    getBy,
    query,
    insert,
    update,
    remove
}