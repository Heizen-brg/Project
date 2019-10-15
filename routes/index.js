var express = require('express');
var router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

//config session
router.use(session({
  secret: 'cgv@1234',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000 }
}))
//config body-parser
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
/* GET home page. */

router.get('/login', function (req, res, next) {
  res.sendFile(path.join(__dirname, './index.html'))
})

router.post('/login', function (req, res, next) {
  if (req.body.username == 'Dinosaur' && req.body.password == '0000') {

    req.session.user = {
      username: req.body.username,
      password: req.body.password
    }
    console.log('====login');
    
  }
  res.json('done')
})

var checkLogin = function (req,res,next) {
  if (req.session.user) {
    return next()
  } else {
   return res.redirect("/login")
    
  }
  
  }
  router.get('/home',checkLogin, function (req, res, next) {
    res.render('home', { title: 'Express', ID: req.session.user });
  });
router.post('/home',function (req,res,next) { 
  req.session.destroy(function (err) {
    if (err) {
      return next(err)
    }else {
      res.redirect("/login")
    }
    })
 })



module.exports = router;
