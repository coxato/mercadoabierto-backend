const { check } = require("../../../auth");
const err = require("../../../utils/error");

function secureUserAction(action) {
    
    return function(req, res, next){
        switch (action) {
            case 'get-info':
                check.logged(req);
                next();
                break;

            default:
                err(`action: ${action} not valid`);
        }
    }

}

module.exports = secureUserAction;