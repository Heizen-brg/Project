var productService = require('../serviece/productService');
var express = require("express");
var router = express.Router();
var authen = require("./authen.js");
// getAll
router.get("/",authen.authen, async function(req,res,next){
    if (parseInt(req.headers.data) == 3) {
      var result = await productService.getAllProductGuest();
      res.json({
          result,
          type: req.headers.data
      });
    } else if (parseInt(req.headers.data) ==1)  {  
        var result = await productService.getAllProductAdmin();
        res.json({
          result,
          type: req.headers.data
        });
    }else if(parseInt(req.headers.data) == 2){
         var result = await productService.getAllProductManager();
         res.json({
           result,
           type: req.headers.data
         });
    }
})
//getId
router.get("/:id",authen.authen, async function(req,res,next){
    var id = req.body.id;
    var result = await productService.getIdProduct(id);
    res.json(result);
});
//get create
router.post("/",authen.authen,async function(req,res,next){
    var id = parseInt(Date.now() / 10000);
    var username = req.body.username;
    var password =req.body.password;
    var type = req.body.type;
    var result = await productService.createProduct(id,type,username,password);
    res.json(result);
});
//  update
router.put("/",authen.authen, async function(req,res,next){
    var id= req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var type = req.body.type;
   await productService.updateProduct(id,type,username,password);
  var result = await productService.getIdProductAdmin(id);
    res.json({result});
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
  var type = 3;
  var result = await productService.createProduct(id, type, username, password);
  res.json(result);
});
//paging
router.get ('/page/:number',async function(req,res,next) {
  var number = req.params.number;
  var result = await productService.page(number);
  res.json(result);
})
module.exports = router