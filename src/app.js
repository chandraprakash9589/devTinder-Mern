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

//delete the user fromt the databse
app.delete("/user", async (req, res, next) => {
  const userEmail = req.body.email;
  const userId = req.body.userId;

  try {
    // const deletedUser = await UserModel.findByIdAndDelete({ _id: userId });

    const deletedUser = await UserModel.findOneAndDelete({ email: userEmail });
    if (!deletedUser) {
      return res.status(404).send("user not found with the provided email");
    }
    res.send("user deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting the user: " + err.message);
  }
});
// update the user from the database
app.patch("/user", async (req, res, next) => {
  const userEmail = req.body.email;
  const ALLOWED_UPDATES = [
    "firstName",
    "LastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  // build the fields to update from everything EXCEPT the email matcher
  const { email, ...updateData } = req.body;

  // reject the whole request if any field is not allowed to be edited
  const isUpdateAllowed = Object.keys(updateData).every((key) =>
    ALLOWED_UPDATES.includes(key)
  );
  if (!isUpdateAllowed) {
    return res
      .status(400)
      .send("Update not allowed." )
  }

  try {
    const user = await UserModel.findOneAndUpdate(
      { email: userEmail },
      updateData,
      { new: true, runValidators: true } // this option will return the updated document and also it will run the validators defined in the schema for the updated fields,
    );
    if (!user) {
      return res.status(404).send("user not found with the provided email");
    }
    res.send({ message: "user updated successfully", user });
  } catch (err) {
    res.status(500).send("Error updating the user: " + err.message);
  }
});
//update the user from the database using userId
app.patch("/user/:userId", async (req, res, next) => {
  const userId = req.params?.userId;
  const ALLOWED_UPDATES = [
    "firstName",
    "LastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  // email is NOT in ALLOWED_UPDATES, so trying to edit it will be rejected
  const updateData = req.body;

  // reject the whole request if any field is not allowed to be edited
  const isUpdateAllowed = Object.keys(updateData).every((key) =>
    ALLOWED_UPDATES.includes(key)
  );
  if (!isUpdateAllowed) {
    return res
      .status(400)
      .send("Update not allowed. You can only edit: " + ALLOWED_UPDATES.join(", "));
  }
  // only validate skills if they are being updated
  if (updateData.skills && updateData.skills.length > 10) {
    return res.status(400).send("You can not add more than 10 skills");
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true } // this option will return the updated document and also it will run the validators defined in the schema for the updated fields,
    );
    if (!user) {
      return res.status(404).send("user not found with the provided id");
    }
    res.send({ message: "user updated successfully", user });
  } catch (err) {
    res.status(500).send("Error updating the user: " + err.message);
  }
});
// ---- NEW: userId-based update (email is now a forbidden field, so editing it is rejected) ----
// app.patch("/user", async (req, res, next) => {
//   const ALLOWED_UPDATES = [
//     "firstName",
//     "LastName",
//     "age",
//     "gender",
//     "photoUrl",
//     "about",
//     "skills",
//   ];
//   // identify the user by userId, NOT email — everything else is update data
//   const { userId, ...updateData } = req.body;

//   // reject the whole request if any field is not allowed to be edited (e.g. email, password)
//   const isUpdateAllowed = Object.keys(updateData).every((key) =>
//     ALLOWED_UPDATES.includes(key)
//   );
//   if (!isUpdateAllowed) {
//     return res
//       .status(400)
//       .send("Update not allowed. You can only edit: " + ALLOWED_UPDATES.join(", "));
//   }

//   try {
//     const user = await UserModel.findByIdAndUpdate(
//       userId,
//       updateData,
//       { new: true, runValidators: true } // this option will return the updated document and also it will run the validators defined in the schema for the updated fields,
//     );
//     if (!user) {
//       return res.status(404).send("user not found with the provided id");
//     }
//     res.send({ message: "user updated successfully", user });
//   } catch (err) {
//     res.status(500).send("Error updating the user: " + err.message);
//   }
// });
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
