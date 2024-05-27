const { validationResult, matchedData } = require("express-validator");
const bcrypt = require('bcrypt');

const User = require('../models/Users');


module.exports.Login = (req, res) => {
    const result = validationResult(req);
    
    if(!result.isEmpty())
        return res.status(400).send({error:result.array()});
        
    const data = matchedData(req);
    return res.status(200).send( {msg:data} );
};

module.exports.Register = async (req, res) => {
    const result = validationResult(req);
    
    if(!result.isEmpty())
        return res.status(400).send({error:result.array()});
    
    const data = matchedData(req);

    try {
        const hashedPassword = await bcrypt.hash(data.password,10);
        const saveUser = new User({...data,password:hashedPassword});
        await saveUser.save();
        return res.status(200).send({msg:"Registration success!"});
    } catch (error) {
        return res.status(500).send({msg: error.msg});
    }
};