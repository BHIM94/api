var express = require("express");
const {
  GetUser,
  GetUsers,
  SaveUser
} = require("../services/userBusinessLogic");
const { validatePayloadSchema } = require("../models/UserModel");
var router = express.Router();

/* GET All Users */
router.get("/", async function(req, res) {
  try {
    const users = await GetUsers();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});
/*Get a specific User by _id*/
router.get("/:_id", async function(req, res) {
  try {
    const user = await GetUser(req.params._id);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});
//POST API for saving Users
router.post("/", async function(req, res) {
  try {
    await validatePayloadSchema(req.body);
    const response = await SaveUser(req.body);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
