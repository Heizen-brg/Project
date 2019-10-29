var {User,Sequelize} = require("../lib/dbconnect");
const Op = Sequelize.Op;

//get ful
function getAll() {
  return User.findAll({ raw: true });
}
//get id guest
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
//get id Admin
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
function createProduct(id, type, username,email, password) {
  return User.create(
    {
      id: id,
      type: type,
      username: username,
      email: email,
      password: password
    },
    {
      raw: true
    }
  );
}
//update
function updateProduct(id, type, username, password,email) {
  return User.update(
    {
      type: type,
      username: username,
      password: password,
      email:email
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
