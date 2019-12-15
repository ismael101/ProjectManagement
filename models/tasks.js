'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {});
  Tasks.associate = function(models) {
    // associations can be defined here
    Tasks.belongsTo(models.Projects,{
      foreignKey: 'projectid',
      onDelete: 'CASCADE',
      hooks:true
    })
    Tasks.belongsTo(models.Users,{
      foreignKey: 'assigned',
      onDelete: 'SET NULL'
    })
    Tasks.belongsTo(models.Teams,{
      foreignKey:'teamid',
      onDelete:'CASCADE',
      hooks:true
    })
  };
  return Tasks;
};