const jwt = require('jsonwebtoken');

/** @namespace application.app.security.JWT**/
module.exports.verifyJWT = async (req, res, next) => {
    try {

        const token = req.headers['x-access-token'];
        if (!token) return res.status(403).json({msg: "Não autorizado"});
        req.user = await jwt.verify(token, process.env.SECRET || "dev");
        next();
    } catch(e) {
        res.status(403).json({msg: "Não autorizado"})
    }
}

module.exports.getToken = async (req) => {
    return req.headers['x-access-token'];
}

module.exports.getUserId = async (req) => {
    try {
        let token = this.getToken(req)
        const user = await jwt.verify(token, process.env.SECRET || "dev");
        return user._id;
    } catch (e) {
        return null;
    }
}

