var express = require("express");
var router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
var fs = require("fs");
var check = require("../serviece/authorService");
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
  return next({ err: "acc va pass khong dung" });
});
//trang home
router.get("/home", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/home.html"));
});
//trang create product
router.get("/create", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/createProduct.html"));
});
module.exports = {router};
