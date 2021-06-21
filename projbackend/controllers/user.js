const User = require("../models/user");
const Order1 = require("../models/order");

exports.getUserById = (req,res,next,id) =>{
    // console.log("ioio");
    User.findById(id).exec((err,user)=>{
       
        if(err || !user){ 
            console.log("uuuu");
            return res.status(400).json({
                error:"No user found in DB"
            })
        }
        // console.log("success");
        req.profile = user;   // we created an object called profile inside reuest
                              // profile object contains details about user  
                            //   console.log(req.profile);
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

// exports.getUsers = (req,res) =>{
//     User.find((err,user) => {       
//         if(err || !user){ 
//             console.log("uuuu");
//             return res.status(400).json({
//                 error:"No users found in DB"
//             })
//         }
//         console.log("success");
//         req.users = user;   
//         console.log(req.users );
//         return res.json(user);    
//     })
// }

exports.updateUser = (req,res) =>{
    console.log("in update")
    User.findByIdAndUpdate(
        {_id:req.profile.id},
        {$set: req.body},
        {new:true, userFindAndModify: false},
        (err,user) =>{
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to update this user"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined
            return res.json(user);
        }
    )
}

exports.userPurchaseList = (req,res) =>{
    Order1.find({user: req.profile._id})
    .populate("user","_id name")
    .exec((err,order) =>{
        if(err || !order){
            return res.status(400).status({
                error:"No orders in this account"
            })
        }
        return res.json(order)
    })
}
