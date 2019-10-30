var productService = require('../serviece/productService');
var express = require("express");
var router = express.Router();
var authen = require("./authen.js");
router.get("/",authen.authen,async function(req,res,next){
  var result = await productService.getAll();
  res.json(result);
});
//get username
router.get("/:username",authen.authen, async function(req,res,next){
  if (req.headers.type == 1) {
      var username = req.params.username;
      var result = await productService.getUserProductAdmin(username);
      res.json(result);
  } else if (req.headers.type == 2) {
      var username = req.params.username;
      var result = await productService.getUserProductManger(username);
      res.json(result);
  } else if (req.headers.type == 3) {
      var username = req.params.username;
      var result = await productService.getUserProductGuest(username);
      res.json(result);
  }
});
//get create
router.post("/",authen.authen,async function(req,res,next){
    var id = parseInt(Date.now() / 10000);
    var username = req.body.username;
    var email = req.body.email;
    var password =req.body.password;
    var type = req.body.type;
    var result = await productService.createProduct(id,type,username,email,password);
    res.json(result);
});
//  update
router.put("/",authen.authen, async function(req,res,next){
    var id= req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var type = req.body.type;
   await productService.updateProduct(id,type,username,password,email);
  var result = await productService.updateProduct(id);
    res.json(result);
})
router.delete("/:id",authen.authen, async function(req, res, next) {
  var id = req.params.id;
   await productService.deleteProduct(id);
   res.json({
       status:"Xoa thang cong"
   })
});
//sign in
router.post("/sign-in", async function(req, res, next) {
  var id = parseInt(Date.now() / 10000);
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var type = 3;
  var result = await productService.createProduct(id, type, username,email, password);
  res.json(result);
});

module.exports = router