var {User,Sequelize} = require("../lib/dbconnect");
const Op = Sequelize.Op;

//get ful api
function getAll() {
  return User.findAll();
}
//get id guest
function getUserProductGuest(username) {
  return User.findAll({
    attributes: ["id", "username"],
    where: {
      username: username,
      type:3
    },
  });
}
//get id Admin
function getUserProductAdmin(username) {
  return User.findAll({
    where: {
      username: username
    }
  });
}
function getUserProductManger(username) {
  return User.findAll({
    where: {
      username: username,
      [Op.and]: [{ type: 3 }, { type: 2 }]
    }
  });
}
//create
function createProduct(id, type, username, password) {
  return User.create({
    id: id,
    type: type,
    username: username,
    password: password
  });
}
//update
function updateProduct(id, type, username, password) {
  return User.update(
    {
      type: type,
      username: username,
      password: password
    },
    {
      where: {
        id: id
      }
    }
  );
}
//delete guest
function deleteProduct(id) {
  return User.destroy({
    where: {
      id: id
    }
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
