var User = require('../lib/dbconnect');
//get full api
function getAllProduct(){
 return User.findAll();
}
//get id
function getIdProduct(id) {
  return User.findAll({
    where:{
      id:id
    }
  })
}
//create
function createProduct(id,type,username,password) {
  return User.create({
    id: id,
    type: type,
    username:username,
    password: password
  })
}
//update 

function updateProduct(id,type,username,password){
  return User.update({
    type:type,
    username:username,
    password:password
  },{
    where:{
      id:id
    }
  })
}
//delete
function deleteProduct(id){
  return User.destroy({
    where:{
      id: id
    }
  })
}
module.exports= {
  getAllProduct,
  getIdProduct,
  createProduct,
  updateProduct,
  deleteProduct
}