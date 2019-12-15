'use strict';
const bcrypt = require('bcrypt')
var salt = bcrypt.genSaltSync(process.env.SALT);
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    role:{
      type:DataTypes.STRING,
      allowNull:false
    },
    profilepic:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    hooks:{
      //hashsing password after its validated
      afterValidate: (user) => {
        user.password = bcrypt.hashSync(user.password,salt)
      }
    }
  });
  Users.associate = function(models) {
    // associations can be defined here
    Users.belongsTo(models.Teams,{
      foreignKey: 'teamid',
      onDelete: 'CASCADE'
    })
  };
  return Users;
};