const jwt = require('jsonwebtoken');
const user_model_schema = require('../models/user_model');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET); // replace Bearer from token if exists
        const user = await user_model_schema.findOne({ _id : decoded._id, 'tokens.token' : token });
        if(!user) {
            throw new Error();
        }
        
        req.token = token;
        req.user = user;
        next();
    }catch(e) {
        res.status(401).send({ Error: 'Invalid auth signature !' });
    }
}

module.exports = auth