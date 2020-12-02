const { checkProps } = require("@utils/checkObjProps");
const err = require("@utils/error");

function checkReqBody(propsToCheck = []) {
    return function checking(req, res, next){
        let allOk;

        if(propsToCheck.length){
            allOk = checkProps(false, req.body, propsToCheck);
        }else{
            allOk = checkProps(true, req.body);
        }
        
        if(!allOk) throw err('the {body} object is missing values', 400);
        
        next();
    }
}

module.exports = {
    checkReqBody
}