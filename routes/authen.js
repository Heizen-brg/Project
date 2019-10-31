var fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
var authen =  function(req, res, next) {
  var token = req.headers.token;
  var publick = fs.readFileSync(path.join(__dirname, "../cert.pem"));
  jwt.verify(token, publick,  {algorithm: "RS256", expiresIn: 60*60*24},function(err, data) {
    if(err){
        res.redirect("/home");
    }else{
      res.locals = data;
      return next(); 
    }
    
  });
};
module.exports = {authen}