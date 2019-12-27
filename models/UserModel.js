const mongoose = require("mongoose");
const User = mongoose.model(
  "UserDetails",
  new mongoose.Schema(
    {
      Name: String,
      Email: String,
      Phone: String,
      CreatedAt: { type: Date, default: Date.now() },
      CreatedBy: String
    },
    { collection: "UserDetails" }
  )
);

module.exports = User;
