var { User, Sequelize } = require("../lib/dbconnect");
const Op = Sequelize.Op;

//get full
function getAll() {
  return User.findAll({ raw: true });
}
//get user guest
function getUserProductGuest(username) {
  return User.findAll({
    attributes: ["id", "username"],
    where: {
      username: username,
      type: 3
    },
    raw: true
  });
}
//get user Admin
function getUserProductAdmin(username) {
  return User.findAll({
    where: {
      username: username
    },
    raw: true
  });
}
function getUserProductManger(username) {
  return User.findAll({
    where: {
      username: username,
      [Op.and]: [{ type: 3 }, { type: 2 }]
    },
    raw: true
  });
}
//create
function createProduct(id, username, password, email, type) {
  return User.create(
    {
      id: id,
      username: username,
      password: password,
      email: email,
      type: type
    },
    {
      raw: true
    }
  );
}
//update
function updateProduct(id, username, password, email, type) {
  return User.update(
    {
      username: username,
      password: password,
      email: email,
      type: type
    },
    {
      where: {
        id: id
      },
      raw: true
    }
  );
}
//delete guest
function deleteProduct(id) {
  return User.destroy({
    where: {
      id: id
    },
    raw: true
  });
}
module.exports = {
  getAll,
  getUserProductGuest,
  getUserProductAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  getUserProductManger
};
