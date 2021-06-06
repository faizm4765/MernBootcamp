var express = require('express')
var router = express.Router()
const { check,validationResult } = require('express-validator');

const { signout,signin,signup,isSignedIn } = require("../controllers/auth")

router.post("/signup",
    check("name").isLength({min:3}).withMessage("name should be atleast 3 characters long"),
    check("email").isEmail(),
    check("password").isLength({min:6}).withMessage("password should be atleast 3 characters long"),
signup)

router.post("/signin",
    check("email").isEmail(),
    check("password").isLength({min:6}).withMessage("password field is compulsory"),
signin)


router.get("/signout",signout)

router.get("/testRoute",isSignedIn,(req,res) => {
    res.send("A protected route")
})

module.exports = router