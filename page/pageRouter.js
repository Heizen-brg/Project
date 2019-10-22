var express = require("express");
var router = express.Router();
var authen = require("../routes/authen");
var pageService = require("../serviece/pageService");
router.get("/page/:number", async function(req, res, next) {
  if (req.headers.data == 1) {
    var numberPage = parseInt(req.params.number);
    var result = await pageService.pageAllAdmin(numberPage);
    res.json({ result });
  } else if (req.headers.data == 2) {
    var numberPage = parseInt(req.params.number);
    var result = await pageService.pageAllManager(numberPage);
    res.json({ result });
  } else if (req.headers.data== 3) {
    var numberPage = parseInt(req.params.number);
    var result = await pageService.pageAlltGuest(numberPage);
    res.json({ result});
  }
});
module.exports = router;
