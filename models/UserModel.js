const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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
const userSchema = Joi.object({
  Name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  Phone: Joi.number()
    .min(6)
    .max(12)
    .required(),

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
