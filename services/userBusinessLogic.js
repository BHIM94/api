const { User } = require("../models/UserModel");
// const mongoose = require("mongoose");

async function GetUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw err;
  }
}
async function GetUser(_id) {
  try {
    const user = await User.findById(_id);
    return user;
  } catch (err) {
    throw err;
  }
}
async function SaveUser(userDetails) {
  try {
    const user = new User({
      Name: userDetails.Name,
      Email: userDetails.Email,
      Phone: userDetails.Phone,
      CreatedBy: userDetails.CreatedBy
    });
    const savedUser = await user.save();
    return savedUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { GetUser, GetUsers, SaveUser };
