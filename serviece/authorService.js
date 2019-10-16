var User = require("../lib/dbconnect");
const Op = Sequelize.Op;
function check(username,password){
    return findAll({
      where: {
        [Op.and]: [{ username: username }, { password: password }]
      }
    });
}
module.exports = {check}