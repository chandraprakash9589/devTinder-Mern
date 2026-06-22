const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
function AdminAuths(err, req, res, next) {
  const token = "xyz";
  const isAdminsAuthenticated = token === "xyz";
  if (!isAdminsAuthenticated) {
    res.status(401).send("you are not authenticated");
  } else {
    next();
  }
}

 async function  userAuths(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).send("you are not authenticated");
    }
   const jwt_secret=process.env.jwt_secret

    const decoded = jwt.verify(token,jwt_secret);
    const { _id } = decoded;
    const user= await UserModel.findById(_id);
    if(!user){
      return res.status(401).send("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send("Error authenticating user: " + err.message);
  }
}

module.exports = { AdminAuths, userAuths };
