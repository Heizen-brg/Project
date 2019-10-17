var express = require('express');
var router = express.Router();

//config ejs
router.get('/listproduct', function (req, res, next) {
  res.render('home', { title: 'Express', ID: req.session.user });
});


///logout button
router.post('/listproduct',function (req,res,next) { 
req.session.destroy(function (err) {
  if (err) {
    return next(err)
  }else {
    res.redirect("/login")
  }
  })
})

module.exports = router;
