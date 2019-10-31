const jwt = require("jsonwebtoken");
var check = function(req, res, next){
    // console.log(req.cookies.token)
    jwt.verify(req.cookies.token, 'your_jwt_secret', function(err, decoded) {
      if(!err){
        req.type = decoded.type
        next()
      }else{
       res.redirect('/login')
      }
    });  
}

module.exports = check;