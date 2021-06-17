const User = require("../models/user");

exports.getUserById = (req,res,next,id) =>{
    console.log("ioio");
    User.findById(id).exec((err,user)=>{
       
        if(err || !user){ 
            console.log("uuuu");
            return res.status(400).json({
                error:"No user found in DB"
            })
        }
        console.log("success");
        req.profile = user;   // we created an object called profile inside reuest
                              // profile object contains details about user  
                              console.log(req.profile);
        next();
        
    })
}

exports.getUser = (req,res) =>{
    // come back here to handle password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
}

exports.getUsers = (req,res) =>{
    
    User.find((err,user) => {
       
        if(err || !user){ 
            console.log("uuuu");
            return res.status(400).json({
                error:"No user found in DB"
            })
        }
        console.log("success");
        req.users = user;   
        console.log(req.users);
        return res.json(user);    
    })
}