const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter the strong password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("photo url is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "Hey there! I am using Dev-Tinder",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt; updatedAt refreshes on every update
  },
);
userSchema.methods.getJWT = async function () {
  const user = this;
  const jwt_secret = process.env.jwt_secret;
  const token = await jwt.sign({ _id: user._id }, jwt_secret, {
    expiresIn: "12h",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isValidPassword = await bcrypt.compare(passInputByUser, passwordHash);

  return isValidPassword;
};
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
