var productService = require('../serviece/productService');
var express = require("express");
var router = express.Router();
var authen = require("./authen.js");
// getAll
router.get("/",authen.authen, async function(req,res,next){
    var i = parseInt(req.headers.id);
    console.log(req.headers.id);
    if (parseInt(req.headers.data) == 3) {
      var result = await productService.getAllProductGuest(i);
      res.json({
          result,
          type: req.headers.data
      });
    } else if (parseInt(req.headers.data) == 1 || parseInt(req.headers.data) == 2)  {  
        var result = await productService.getAllProductAdmin(i);
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
router.get("/updateProduct",function(req,res,next){
    res.render(path.join(__dirname,"../views/updateProduct.html"))
})
router.put("/",authen.authen, async function(req,res,next){
    var id= req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var type = req.body.type;
   var result = await productService.updateProduct(id,type,username,password);
    res.json({
        status: "Cap nhat thanh cong"
    })
})
router.delete("/:id",authen.authen, async function(req, res, next) {
  var id = req.params.id;
   await productService.deleteProduct(id);
  res.json({
      static: "Xoa thanh cong"
  });
});
module.exports = router