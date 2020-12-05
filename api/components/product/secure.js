const { check } = require("../../../auth");
const err = require("../../../utils/error");

function secureAction(action) {
    
    return function(req, res, next){
        switch (action) {
            case 'media':
                check.logged(req);
                next();
                break;
        
            default:
                err(`action: ${action} not valid`);
        }
    }

}

module.exports = secureAction;