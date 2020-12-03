function success(res, status = 200, dataOrMessage = '') {
    res.status(status).send({
        status,
        error: false,
        body: dataOrMessage
    })
}

function error(res, err) {
    const status = err.statusCode || 500;

    res.status(status).send({
        status,
        error: true,
        body: err.message || 'Internal server error'
    });

}

module.exports = {
    success,
    error
}