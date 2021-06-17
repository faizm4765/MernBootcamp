const express = require("express");
const router = express.Router();

const { getUserById, getUser,getUsers} = require("../controllers/user");
const { isSignedIn, isSignedIn1, isAuthenticated, isAdmin} = require("../controllers/auth");

router.param("userId", getUserById);  // in this param reuest.profile is assigned with user details

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);  
router.get("/users", getUsers);  
module.exports = router;

