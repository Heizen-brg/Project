var { User, Sequelize } = require("../lib/dbconnect");
function page(id) {
  return User.findAll(
    {
      limit:8,
      offset:(id-1)*8
    }
  );
}
module.exports = page;