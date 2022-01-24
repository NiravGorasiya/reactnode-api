const router =require("express").Router();
const {userRegister,userLogin,forgotpassword,verifyemail,resetpassword,updateuser}=require("../controllers/userController")
const auth =require("../middlewares/verifytoken")
router.post("/register",userRegister)
router.post("/login",userLogin)
router.post("/verifyemail",verifyemail)
router.patch("/forgotpassword",forgotpassword)
router.patch("/resetpassword",resetpassword)
router.patch("/updateuser",updateuser)
module.exports =router