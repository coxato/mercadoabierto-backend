/**
 * check undefined or void, because null can be acepted and zero(0) too
 * @returns {boolean} true | false
 */
function isUndefinedOrVoidStr(value) {
    if(typeof value === 'undefined') return true;
    if(typeof value === 'string' && value.trim().length === 0) return true;
    return false;
}

/**
 * check object props to not be `undefined` or `void string`
 * @param {boolean} checkAll check all the props
 * @param {object} obj object to check
 * @param {array} keysArr specific props to check
 * @returns {boolean} true | false
 */
function checkProps(checkAll, obj, keysArr = []) {
    if(checkAll){
        for(let value of Object.values(obj)){
            if(isUndefinedOrVoidStr(value)) return false;
        }
    }
    else{
        // check only passed props
        for(let key of keysArr){
            const value = obj[key];
            if(isUndefinedOrVoidStr(value)) return false;
        }
    }
    // all ok
    return true;
}

module.exports = {
    checkProps
}