const { check } = require("../../../auth");
const err = require("../../../utils/error");

function secureRewardAction(action) {
    
    return function(req, res, next){
        switch (action) {
            case 'reward':
                check.logged(req);
                next();
                break;

            default:
                err(`action: ${action} not valid`);
        }
    }

}

module.exports = secureRewardAction;