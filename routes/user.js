var express = require("express");
const auth = require("../middlewares/auth");
const {
  GetUser,
  GetUsers,
  SaveUser,
  Login
} = require("../services/userBusinessLogic");
const { validatePayloadSchema } = require("../models/UserModel");
var router = express.Router();

/**
 * @swagger
 *   definitions:
 *   User:
 *     properties:
 *       Name:
 *         type: string
 *       Email:
 *         type: string
 *       Password:
 *         type: integer
 *       Phone:
 *         type: string
 *       CreatedAt:
 *         type:string
 *       CreatedBy:
 *         type:string
 * /api/user:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     security:
 *       -bearerAuth : []
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
/* GET All Users */
router.get("/", auth, async function(req, res) {
  try {
    const users = await GetUsers();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});
/*Get a specific User by _id*/
router.get("/:_id", auth, async function(req, res) {
  try {
    const user = await GetUser(req.params._id);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});
//POST API for Registering Users
router.post("/", async function(req, res) {
  try {
    await validatePayloadSchema(req.body);
    const { savedUser, token } = await SaveUser(req.body);
    res.header("x-jwt-token", token).send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});
//POST API for Logging users in the App
router.post("/", async function(req, res) {
  try {
    await validatePayloadSchema(req.body);
    const { user, token } = await Login(req.body);
    res.header("x-jwt-token", token).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
