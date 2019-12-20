var express = require("express");
var router = express.Router();
console.log("Hello World");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Welcome" });
});

module.exports = router;
