const express = require("express");
const router = express.Router();

const { getUserById,getUser,getUsers,updateUser,userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");

router.param("userId", getUserById);  // in this param reuest.profile is assigned with user details

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);  
// router.get("/users", getUsers);  to get all the users in the application
router.put("/user/:userId",isSignedIn, isAuthenticated,updateUser);
router.put("/orders/user/:userId",isSignedIn, isAuthenticated,userPurchaseList);
module.exports = router;

