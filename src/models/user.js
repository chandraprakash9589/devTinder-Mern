const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 50,
  },
  LastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if(!["male","female","other"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    },
  },
  photoUrl:{
    type: String,
    default:"https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4"
  },
  about:{
    type: String,
    default:"Hey there! I am using Dev-Tinder"
  },
  skills: {
    type: [String]
  },
}, {
  timestamps: true, // automatically adds createdAt and updatedAt; updatedAt refreshes on every update
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
