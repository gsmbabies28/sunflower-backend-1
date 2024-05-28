const jwt = require('jsonwebtoken');

module.exports.createToken =  ({_id, email,isAdmin}) => {
    const payLoad = {
        id: _id,
        email: email,
        isAdmin: isAdmin
    }
    const token = jwt.sign(payLoad,process.env.SECRET_KEY,{expiresIn:'2h'});
    return token;
};