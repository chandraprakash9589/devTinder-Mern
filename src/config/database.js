const mongoose = require("mongoose");
require("dotenv").config();
const MongoUrl = process.env.MongoUrl;
const connectDB = async () => {
  await mongoose.connect(MongoUrl);
};
module.exports = connectDB;
