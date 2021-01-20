const response = require("./response");

// express error middleware
function errorMiddleware(err, req, res, next) {
    console.error('[error]', err);

    response.error(res, err);
}

module.exports = errorMiddleware;