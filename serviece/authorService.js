var User = require("../lib/dbconnect");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
function check(username,password){
    return User.findAll({
      where: {
        [Op.and]: [{ username: username }, { password: password }]
      }
    });
}
module.exports = {check}