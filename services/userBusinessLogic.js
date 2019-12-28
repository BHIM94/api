const { User } = require("../models/UserModel");
const hashPassword = require("../helpers/hash");
const bcrypt = require("bcryptjs");

async function GetUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw err;
  }
}
async function GetUser(userDetails) {
  try {
    const user = await User.find({ Email: userDetails.Email });
    return user;
  } catch (err) {
    throw err;
  }
}
//Register a user into the app
async function SaveUser(userDetails) {
  try {
    const user = new User({
      Name: userDetails.Name,
      Email: userDetails.Email,
      Password: userDetails.Password,
      Phone: userDetails.Phone,
      CreatedBy: userDetails.CreatedBy
    });
    user.Password = await hashPassword(user.Password);
    const savedUser = await user.save();
    const token = user.generateJWTToken();
    return { savedUser, token };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
//Login a user into the app
async function Login(userDetails) {
  try {
    //First Query the User in the database
    const user = User.find({ Email: userDetails.Email });
    if (!user) return "No Such User is Present in the Database";

    if (await bcrypt.compare(userDetails.Password, user.Password)) {
      const token = user.generateJWTToken();
      return { user, token };
    } else {
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { GetUser, GetUsers, SaveUser, Login };
