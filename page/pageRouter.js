var express = require("express");
var router = express.Router();
var authen = require("../routes/authen");
var pageService = require('../serviece/pageService')
router.get("/page/:number", async function(req, res, next) {
  var numberPage = parseInt(req.params.number);
  var result = await pageService(numberPage);
  res.json({result,numberPage});
});
module.exports = router