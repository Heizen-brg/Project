var { User, Sequelize } = require("../lib/dbconnect");
const Op = Sequelize.Op;
// pageAllAdmin
function pageAllAdmin(id) {
  return User.findAll(
    {
      limit:6,
      offset:(parseInt(id)-1)*6,
      raw:true
    }
  );
}
// page guset
function pageAlltGuest(id) {
  return User.findAll(
    {
      where:{
        type:3
      },
      attributes: ["id", "username","email"],
      limit: 6,
      offset: (parseInt(id) - 1) * 6
    },

  );
}
//get full api guest
function pageAllManager(id) {
  return User.findAll({
    where: {
      [Op.and]: [{ type: 3 }, { type: 2 }]
    },
    limit: 6,
    offset: (parseInt(id) - 1) * 6
  });
}
module.exports = { pageAllAdmin,pageAllManager,pageAlltGuest };