const jwt = require('./jwt');
const utils = require('../routes/utils/utils');
let whitelists = [
'/api/v1/user'
]

exports.jwtCheck = function (req, reply, next) {
    console.log(req.url)
    let { authorization = '' } = req.headers;
    let isValid = jwt.verifyToken(authorization);
    if (isValid || whitelists.includes(req.url)) {
        next();
    } else {
        utils.sendResponseV1(false, 'failed in auth', 0, {}, '', reply)
    }
}