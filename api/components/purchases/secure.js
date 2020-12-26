const { check } = require("../../../auth");
const err = require("../../../utils/error");

function securePurchaseAction(action) {
    
    return function(req, res, next){
        switch (action) {
            case 'buy':
                check.isOwner(req, req.body.id_user_buyer)
                next();
                break;

            case 'get-purchases':
                check.isOwner(req, req.params.id_user);
                next();
                break;

            default:
                err(`action: ${action} not valid`);
        }
    }

}

module.exports = securePurchaseAction;