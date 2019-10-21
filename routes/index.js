var express = require("express");
var router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
var fs = require("fs");
var check = require("../serviece/authenService");
//config body-parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
/* GET listProduct page. */
router.get("/login", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});
//Tao token login
router.post("/login", async function(req, res, next) {
  var data = await check.check(req.body.username, req.body.password);
  if (data.length>0) {
    var privateKey = fs.readFileSync(path.join(__dirname, "../key.pem"));
    var token = jwt.sign({},privateKey, { algorithm: "RS256" });
    return res.json({
      token: token,
      type:data[0].type
    });
  }
});
//trang home
router.get("/home", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/home.html"));
  console.log("tes");
});
//trang create product
router.get("/create", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/createProduct.html"));
});
//trang sign-in
router.get("/sign-in",function(req,res,next){
  res.sendFile(path.join(__dirname, "../views/signIn.html"));
})
module.exports = {router};
