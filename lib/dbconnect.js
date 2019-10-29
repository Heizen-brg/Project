const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize("project", "root", "tapyeu98", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email:{
      type:Sequelize.STRING,
      allowNull:false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  //options
  {
    freezeTableName: true,
    timestamps: false,
    raw:true
  }
);

module.exports= {User,Sequelize};