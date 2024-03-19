const httpError = require("http-errors");

exports.internalServerError = (res) =>{
    const error = httpError.InternalServerError();
    return res.status(error.status).json({
        err: error.statusCode,
        mess: error.message
    })
}

exports.badRequestError = (err, res) =>{
    const error = httpError.BadRequest(err);
    return res.status(error.status).json({
        err: error.statusCode,
        mess: error.message
    })
}

exports.notFoundRoute = (req, res) =>{
    const error = httpError.NotFound("Not Found Route");
    return res.status(error.status).json({
        err: error.statusCode,
        mess: error.message
    })
}
exports.unAuthor = (err, res) =>{
    const error = httpError.Unauthorized(err);
    return res.status(error.status).json({
        err: error.statusCode,
        mess: error.message
    })
}