'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.belongsTo(models.Teams,{
      foreignKey: 'team_id',
      onDelete: 'SET NULL'
    })
  };
  return Users;
};