const jwt = require("jsonwebtoken");
const Register = require("../Models/Register");

module.exports = async function (req, res, next) {
  let token = req.header("Authorization");
  if (token) {
    token = req.header("Authorization").replace("Bearer ", "");
  }
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {                                            
    const verified = await jwt.verify(token, process.env.TOKEN_SERECTKEY);
 //   console.log("this is verify check"+verified.login_id);
    const user = await Register.findById(verified.login_id);
    if (!user) {
      return res.status(401).json({ message: "Access Denied" });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
