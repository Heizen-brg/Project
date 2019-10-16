var productService = require('../serviece/productService');
var express = require("express");
var router = express.Router();
// getAll
router.get("/", async function(req,res,next){
    var result = await productService.getAllProduct();
    res.json(result);
})
//getId
router.get("/:id", async function(req,res,next){
    var id = req.params.id;
    var result = await productService.getIdProduct(id);
    res.json(result);
});

//get create
router.post("/",async function(req,res,next){
    var id = parseInt(Date.now() / 10000);
    var username = req.body.username;
    var password =req.body.password;
    var type = 3;
    var result = await productService.createProduct(id,type,username,password);
    res.json(result);
});
//  update
router.get("/updateProduct",function(req,res,next){
    res.render(path.join(__dirname,"../views/updateProduct.html"))
})
router.put("/", async function(req,res,next){
    var id= req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var type = req.body.type;
   var result =   await productService.updateProduct(id,type,username,password);
    res.json({
        status: "Cap nhat thanh cong"
    })
})
router.delete("/:id", async function(req, res, next) {
  var id = req.params.id;
   await productService.deleteProduct(id);
  res.json({
      static: "Xoa thanh cong"
  });
});
module.exports = router