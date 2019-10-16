var express = require('express');
var router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
var fs = require('fs');
var cookie = require('cookie');
var check = require('../serviece/authorService');

router.use(session({
  secret: 'nodemy',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
//config body-parser
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
/* GET listProduct page. */

router.get('/login', function (req, res, next) {
  res.sendFile(path.join(__dirname, './index.html'))
})



//Tao token login
router.post('/login',async function(req , res , next){
  var data = await check.check(req.body.username, req.body.password);
  if(data){
      req.session.user = {
        username : data.username,
        type: data.type
      }
      var privateKey = fs.readFileSync(path.join(__dirname,'./key.pem'));
      var token = jwt.sign(req.session.user, privateKey, { algorithm: 'RS256'});
      
      return res.json(token);
  }
  return next({err:'acc va pass khong dung'})
})

//Middleware check login
var authen = function(req, res , next){
  var token = req.headers.token;
  var publick = fs.readFileSync(path.join(__dirname,'./cert.pem'));
  jwt.verify(token, publick, function(err, data) {
      if(err) return next({err:err})
      res.locals = data
      return next()
});
}

var checkAdmin = function(req, res, next){
  if(req.session.user.type == 1){
    next();
  }
  else{
    return res.status(404).json('khong phai admin')
  }
}

var checkManger = function(req, res, next){
  if(req.session.user.type <= 2){
    next();
  }
  else{
    return res.status(404).json('khong phai manger hay admin')
  }
}

var checkGuest = function(req, res, next){
  if(req.session.user.type <= 3){
    next();
  }
  else{
    return res.status(404).json('khong phai manger hay admin')
  }
}


router.get('/home',function(req,res,next){
  res.sendFile(path.join(__dirname,'home.html'))
})

//Hien trang listProduct
router.get('/listProduct',authen, checkGuest, function (req, res, next) {
  res.json([1,2,3,4,5])
});





module.exports = router;
