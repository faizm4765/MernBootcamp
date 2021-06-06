const User = require("../models/user");

exports.getUserById = (req,res,next,id) =>{
    User.findById(id).exec((user,err)=>{
        if(err || !user){ 
            return res.status(400).json({
                error:"No user found in DB"
            })
        }
        req.profile = user;   // we created an object called profile inside reuest
                              // profile pbject contains details about user  
        next();
    })
}

exports.getUser = (req,res) =>{
    // come back here to handle password
    return res.json(req.profile)
}