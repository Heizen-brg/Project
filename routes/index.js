var express = require("express");
var router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
var fs = require("fs");
var check = require("../serviece/authenService");
var cookieParser = require("cookie-parser");
var pageService = require("../serviece/pageService")
var productService= require("../serviece/productService")
const passport = require('passport');
//session config
router.use(session({
  secret: "cgv@1234",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24*60*60*3600 }
})
);

router.use(cookieParser())
var check = require("./checkToken");
//config body-parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
/* GET listProduct page. */
router.get("/login", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});
//Tao token login
// router.post("/login", async function(req, res, next) {
//   var data = await check.check(req.body.email, req.body.password);
//   if (data.length>0) {
//     var privateKey = fs.readFileSync(path.join(__dirname, "../key.pem"));
//     var token = jwt.sign({type:data[0].type},privateKey, { algorithm: "RS256" });
//     req.session.user = data[0].username;
//     return res.json({
//       token: token
//     });
//   }
// });
router.post('/login', function (req, res, next) {
  console.log('xxx')
  passport.authenticate('local', {session: false}, (err, user, info) => {
      console.log(err);
      if (err || !user) {
          return res.status(400).json({
              message: info ? info.message : 'Login failed',
              user   : user
          });
        }
      req.login(user, {session: false}, (err) => {
          if (err) {
              res.send(err);
          }
          console.log('================ ', user)
          const token = jwt.sign(user ,'your_jwt_secret');
          return res.json({user, token});
      });
  })
  (req, res);
});

//trang home
router.get("/home",check , async function(req, res, next) {
  // console.log(req.type)
  var page = await pageService.pageAllAdmin(1);
  var listProduct = await productService.getAll();
  var numberPage = parseInt(listProduct.length/6)+1;
  res.render("../views/home.ejs", { IDName: req.session.user,page:page,numberPage:numberPage});
});
//trang create product
router.get("/create" ,function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/createProduct.html"));
});

///logout button
router.post("/home", async (req, res) => {
  await req.logout();
  req.session = null;
  await res.clearCookie('token');
  return res.redirect("/login");
});
//trang sign-in
router.get("/sign-in",function(req,res,next){
  res.sendFile(path.join(__dirname, "../views/signIn.html"));
})
module.exports = {router};
