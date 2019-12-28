const bcrypt = require("bcryptjs");

module.exports = async function hashPassword(text) {
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(text, salt);
  return hashedPwd;
};
