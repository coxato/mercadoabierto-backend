const { check } = require("../../../auth");
const err = require("../../../utils/error");

function secureCartAction(action) {
    
    return function(req, res, next){
        switch (action) {
            case 'get-cart':
                check.isOwner(req, req.params.id_user);
                next();
                break;

            case 'is-owner':
                check.isOwner(req, req.body.id_user);
                next();
                break;
            
            default:
                err(`action: ${action} not valid`);
        }
    }

}

module.exports = secureCartAction;