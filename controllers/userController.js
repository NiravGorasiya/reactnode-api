const Register = require("../Models/Register")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { queryErrorRelatedResponse, successResponce } = require("../helper/sendResponse")
const { sendMail } = require("../helper/emailsender")
const res = require("express/lib/response")

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const checkusername = await Register.findOne({ username: username });
    if (checkusername) {
      return res.status(401).json({ message: "Username already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashed = await bcrypt.hash(password, salt);
      const user = new Register({
        username: username,
        email: email,
        password: hashed
      });
      const data = await user.save();
      return res.status(201).json({
        status: "success",
        message: "Register Successfully",
        result: data,
      });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const userLogin = async (req, res) => {
  try {
    let login = await Register.findOne({ username: req.body.username});
    if (!login) {
      res.status(422).json({ error: "please valid username id" });
    } else {
      let isMatch = await bcrypt.compare(req.body.password, login.password);
      const token = jwt.sign(
        { login_id: login._id },
        process.env.TOKEN_SERECTKEY,
        {
          expiresIn: "365d",
        }
      );

      if (isMatch) {
        return res.status(200).json({
          message: "Login successfull",
          data: login,
          token,
        });
      } else {
        return res.status(400).json({ error: "Please valid password" });
      }
    }
  } catch (error) {
    if (error) {
      console.log(error);
    }
    return res.status(400).json(error);
  }
};

const forgotpassword = async (req, res, next) => {
  try {
    const { username } = req.body
    const user = await Register.findOne({ username });
    if (!user) return queryErrorRelatedResponse(req, res, 404, "username is not registered at or may be something wrong.");
    sendMail({
      from: "niravgorasiya10@gmail.com",
      to: user.email,
      sub: "Forgot Password",
      html: ` You One Time Password  is http://localhost:3000/changepassword`, 
    })
    successResponce(req, res, "Please check you mail. (If you not get then check over spam.)");
  } catch (error) {
    next(error)
  }
}

const resetpassword = async (req, res, next) => {
  try {
    const { username, newPassword} = req.body;
    const user = await Register.findOne({ username });
    if (!user) return queryErrorRelatedResponse(req, res, 404, "Username not found!");
    const hashed = await bcrypt.hash(newPassword, 8);
    user.password = hashed;
     await user.save();
    successResponce(req, res, "Password change successfull");
  } catch (error) {
    return next(error)
  }
}

const updateuser =async(req,res,next)=>{
  try {
    const {name,username,category}=req.body
    const updateuser = await Register.findOne({username:username});    
    if(!updateuser) return queryErrorRelatedResponse(req,res,404,"username not found."); 
    updateuser.name=name
    updateuser.category=category
    const result =await updateuser.save();
    res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

const verifyemail =async(req,res,next)=>{
  try {
    const {username}=req.body
    const user =await Register.findOne({username});
    sendMail({
      from: "niravgorasiya10@gmail.com",
      to: user.email,
      sub: "Verify email",
      html: `click on link verify email is http://localhost:3000/login`, 
    })
    res.status(200).send(user)
  } catch (error) {
      return next(error)    
  }
}

module.exports = { userRegister, userLogin, forgotpassword, resetpassword ,updateuser ,verifyemail}