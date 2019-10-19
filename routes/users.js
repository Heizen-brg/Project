var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
const session = require("express-session");
//config ejs
router.get('/home', function (req, res, next) {
    req.session.user = {
      username : req.body.username,
      password : req.body.password,
    }
  res.render('header', { title: 'Express', ID: req.session.user });
});




module.exports = router;
