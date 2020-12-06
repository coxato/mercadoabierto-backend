const { check } = require("../../../auth");
const err = require("../../../utils/error");

function secureAction(action) {
    
    return function(req, res, next){
        switch (action) {
            case 'media':
                check.logged(req);
                next();
                break;
        
            // TODO: 
            // save id_user in product_media and compare user 
            // token decoded id with product_media -> id_user

            default:
                err(`action: ${action} not valid`);
        }
    }

}

module.exports = secureAction;