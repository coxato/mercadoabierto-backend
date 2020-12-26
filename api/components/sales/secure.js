const { check } = require("../../../auth");
const err = require("../../../utils/error");

function secureSaleAction(action) {
    
    return function(req, res, next){
        switch (action) {
            case 'get-sales':
                check.isOwner(req, req.params.id_user);
                next();
                break;

            default:
                err(`action: ${action} not valid`);
        }
    }

}

module.exports = secureSaleAction;