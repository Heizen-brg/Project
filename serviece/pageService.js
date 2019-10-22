var { User, Sequelize } = require("../lib/dbconnect");
const Op = Sequelize.Op;
// pageAllAdmin
function pageAllAdmin(id) {
  return User.findAll(
    {
      limit:8,
      offset:(parseInt(id)-1)*8
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
      attributes: ["id", "username"],
      limit: 8,
      offset: (parseInt(id) - 1) * 8
    },

  );
}
//get full api guest
function pageAllManager(id) {
  return User.findAll({
    where: {
      [Op.and]: [{ type: 3 }, { type: 2 }]
    },
    limit: 8,
    offset: (parseInt(id) - 1) * 8
  });
}
module.exports = { pageAllAdmin,pageAllManager,pageAlltGuest };