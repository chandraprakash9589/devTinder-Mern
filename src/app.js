const express = require("express");
const { AdminAuths } = require("./middlewares/adminAuths.js");
const app = express();
app.use(express.json()); // convert the incoming request body to json format and we can access the data in req.body in evey route handler
const connectDB = require("./config/database.js");
const UserModel = require("./models/user.js");
app.post("/signup", async (req, res, next) => {
  // console.log(req.body)
  // const userData = {
  //   firsName: "chandraprakash",
  //   LastName: "kushwaha",
  //   email: "chandraprakashk9589@gmail.com",
  //   password: "chandraprakash",
  //   age: 22,
  //   gender: "male",
  // };
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.send("user created successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

app.get("/user", async (req, res, next) => {
  const userEmails = req.body.email;
  try {
    const user = await UserModel.find({ email: userEmails });
    if (!user || user.length === 0) {
      return res.status(404).send("No users found with the provided email.");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send("Error fetching users: " + err.message);
  }
});

app.get("/feed", async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Error fetching users: " + err.message);
  }
});

// app.get('/admin',AdminAuths)
// // app.get('/user',(req,res,next)=>{
// //     console.log("user");
// //     next();
// //     res.send("user information 1st");
// // },

// // (req,res,next)=>{
// //     console.log("hello world");
// //     res.send("hello world 2nd");
// // }
// // )
// // // app.get("/ab+cd",(req,res,next)=>{
// // //     res.send("hello world testing again and again");
// // // })
// // app.get('/user/:userid',(req,res,next)=>{
// //     console.log(req.params,"user");
// //     res.send("user information");
// // })
// // app.post('/saving',(req,res,next)=>{
// //     console.log("saving data from the database");
// //     res.send("saving data from the database");
// // })
// // app.delete('/delete',(req,res,next)=>{
// //     console.log("deleting data from the database");
// //     res.send("delete data from the database");
// // })
// // app.use('/test',(req,res,next)=>{
// //     res.send("hello test");
// // })
// app.use('/',(req,res,next)=>{ // this is match all the http method to call we can all get in post as well so we can use the app.get() method for partular method
//     res.send("hello chandraprakash");

// })
connectDB()
  .then(() => {
    console.log("connected to the database");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("DB connection failed, server not started", err);
    process.exit(1);
  });
