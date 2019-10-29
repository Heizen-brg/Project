var {User,Sequelize} = require("../lib/dbconnect");
const Op = Sequelize.Op;
function check(email,password){
    return User.findAll({
      where: {
        [Op.and]: [{ email: email }, { password: password }]
      }
    });
}
module.exports = {check}