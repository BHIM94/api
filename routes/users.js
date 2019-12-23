var express = require("express");
const GetUser = require("../services/userBusinessLogic");
var router = express.Router();

/* GET user listing. */
router.get("/", function(req, res) {
  res.send(GetUser(req));
});

module.exports = router;
