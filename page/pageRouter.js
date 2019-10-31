var express = require("express");
var router = express.Router();
var authen = require("../routes/authen");
var pageService = require("../serviece/pageService");
var productService = require("../serviece/productService")
var check = require("../routes/checkToken");
router.get("/page/:number",check ,async function(req, res, next) {
  var listProductItem = await productService.getAll();
  if (req.type== 1) {
    var numberPage = parseInt(req.params.number);
    var result = await pageService.pageAllAdmin(numberPage);
    res.json({result,listProductItem})
  } else if (req.type == 2) {
    var numberPage = parseInt(req.params.number);
    var result = await pageService.pageAllManager(numberPage);
    res.json({ result, listProductItem });
  } else if (req.type== 3) {
    var numberPage = parseInt(req.params.number);
    var result = await pageService.pageAlltGuest(numberPage);
    res.json({ result, listProductItem });
  }
});
module.exports = router;
