'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define('Teams', {
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true 
    },
    role:{
      type:DataTypes.STRING,
      allowNull:false,
    }
  }, {});
  Teams.associate = function(models) {
    // associations can be defined here
  };
  return Teams;
};