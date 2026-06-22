const validator = require("validator");
const validateSignupData = (req) => {
  const { firstName, LastName, email, password } = req.body;
  if (!firstName || !LastName) {
    throw new Error("firstName and LastName are required");
  } else if (!email || !validator.isEmail(email)) {
    throw new Error("email isnot  valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong");
  }
};

module.exports = { validateSignupData };
