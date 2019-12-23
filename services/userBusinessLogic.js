function GetUser(req) {
  return User;
}
const User = [
  { _id: 1, name: "Soham" },
  { _id: 2, name: "Test" }
];
module.exports = GetUser;
