module.exports = function(logger) {
    return function (err, req, res, next) {
        if (err.name === "UnauthorizedError") {
            logger.info(req.ip+" "+err.message);
            res.status(401).send(err.message);
        } else {
            next();
        }
    };
};