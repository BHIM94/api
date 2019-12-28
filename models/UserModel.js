const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userMongooseSchema = new mongoose.Schema(
  {
    Name: String,
    Email: String,
    Password: String,
    Phone: String,
    CreatedAt: { type: Date, default: Date.now() },
    CreatedBy: String
  },
  { collection: "UserDetails" }
);
userMongooseSchema.methods.generateJWTToken = function() {
  const token = jwt.sign(
    { Name: this.Name, Phone: this.phone, Email: this.Email },
    config.get("System.Api_Secret_Key")
  );
  return token;
};
const User = mongoose.model("UserDetails", userMongooseSchema);
const userSchema = Joi.object({
  Name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  Phone: Joi.number()
    .min(6)
    .max(12)
    .required(),
  Password: Joi.string(),

  Email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  })
});
async function validatePayloadSchema(user) {
  try {
    await userSchema.validateAsync(user);
  } catch (err) {
    throw err;
  }
}

module.exports = { User, validatePayloadSchema };
