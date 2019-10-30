var express = require("express");
var router = express.Router();
var authen = require("../routes/authen");
var pageService = require("../serviece/pageService");
var productService = require("../serviece/productService")
router.get("/page/:number",authen.authen, async function(req, res, next) {
  var listProductItem = await productService.getAll();
  if (res.locals.type== 1) {
    var numberPage = parseInt(req.params.number);
    var result = await pageService.pageAllAdmin(numberPage);
    res.json({result,listProductItem})
  } else if (res.locals.type == 2) {
    var numberPage = parseInt(req.params.number);
    var result = await pageService.pageAllManager(numberPage);
    res.json({ result, listProductItem });
  } else if (res.locals.type== 3) {
    var numberPage = parseInt(req.params.number);
    var result = await pageService.pageAlltGuest(numberPage);
    res.json({ result, listProductItem });
  }
});
module.exports = router;
