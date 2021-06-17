const User = require("../models/user")
const { check,validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req,res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err,user) =>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err:"Unable to save user in DB"
            })
        }
        res.json({
            id:user._id,
            name:user.name,
            email:user.email
        })
    })
}

exports.signin = (req,res) =>{

    const {email,password} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    User.findOne({email},(err,user) =>{
        if(err || !user){
            return res.status(402).json({
                error:"User doesn't exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and password don't match"
            })
        }
        var token = jwt.sign({ _id: user.id }, 'shhhhh');
        res.cookie("token",token,{expire: new Date() + 9999})

        // send response to frontend
        const {_id,name,role} = user;
        return res.json({
            token,              //es-6 syntax for token:token
            user:{_id,name,email,role}
        })
    })
}

exports.signout = (req,res) =>{
    res.clearCookie("token");
    res.json({
        message:'User signed out successfully!'
    })
}



//protected routes
exports.isSignedIn = expressJwt({
    secret:"shhhhh",            //same secret jo signIn mein diye the
    userProperty:"auth"
})

exports.isSignedIn1 = (req,res,next) =>{
    console.log("jiiji");
    next();
}


//custom middlewares
exports.isAuthenticated = (req,res,next) =>{
    console.log(req.profile);
    let checker = req.profile && req.auth && (req.profile._id == req.auth._id);
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin = (req,res,next) =>{

    if(req.profile.role == 0){
        return res.json(403).json({
            error:"You don't have admin access !"
        })
    }
    next();
}