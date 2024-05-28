const jwt = require('jsonwebtoken');


module.exports.createToken = ({_id, email,isAdmin}) => {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) 
        throw new Error("SECRET_KEY environment variable is not set");

    const payLoad = {
        id: _id,
        email: email,
        isAdmin: isAdmin
    }
    try {
        const token = jwt.sign(payLoad,secretKey,{expiresIn:'2h'});
        return token;
    } catch (error) {
        console.log(error);
    }

};

module.exports.verify = async (req,res,next) => {
    const token = req.headers.authorization;

    if(!token) 
      res.status(403).send({error:"Token undefined"});

    try {
        const decodedToken = jwt.verify(token.slice(7),process.env.SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {   
        return res.status(500).send({error:error});
    }

};

module.exports.verifyAdmin = (req,res,next) => {
    if(!req.user.isAdmin)
        res.status(403).send({msg:"Unauthorized login!"})
    next();
};