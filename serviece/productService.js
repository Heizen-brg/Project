var {User,Sequelize} = require("../lib/dbconnect");
const Op = Sequelize.Op;
//get full api guest
function getAllProductGuest() {
  return User.findAll(
    {
      attributes: ["id", "username"]
    },
    {
      where: {
        type: 3 
      }
    }
  );
}
//get full api guest
function getAllProductAdmin() {
  return User.findAll();
}
//get full api guest
function getAllProductManager() {
  return User.findAll({
    where: {
      [Op.or]: [{ type: 2 }, { type: 3 }]
    }
  });
}
//get id guest
function getIdProductGuest(id) {
  return User.findAll({
    attributes:["id","username"],
    where: {
      id: id
    }
  });
}
//get id Admin
function getIdProductAdmin(id) {
  return User.findAll({
    where: {
      id: id
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
  getAllProductManager,
  getAllProductGuest,
  getAllProductAdmin,
  getIdProductGuest,
  getIdProductAdmin,
  createProduct,
  updateProduct,
  deleteProduct
};
