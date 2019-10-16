var fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
var authen =  function(req, res, next) {
  var token = req.token;
  var publick = fs.readFileSync(path.join(__dirname, "cert.pem"),function(){
      console.log('loi do doc file');
  })
  jwt.verify(token, publick, function(err, data) {
    if(err){
        console.log("err");
    }
   return next(); 
  });
};
module.exports = {authen}