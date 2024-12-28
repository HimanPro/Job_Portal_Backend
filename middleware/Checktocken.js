const jwt = require('jsonwebtoken');
require('dotenv').config()
const Checktoken = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        try {
            let decode = jwt.verify(token, process.env.JWT_Secret)
            req.user = decode
            next()
        } catch (error) {
            res.json({msg:error.message, success:false})
        }

    }
    else {
        res.json({msg:'token required', success:false})
    }

}

module.exports = Checktoken