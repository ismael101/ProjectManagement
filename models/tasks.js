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
      foreignKey: 'project_id',
      onDelete: 'cascade',
      hooks:true
    })
    Tasks.belongsTo(models.Users,{
      foreignKey: 'assigned',
      onDelete: 'SET NULL'
    })
    Tasks.belongsTo(models.Teams,{
      foreignKey:'team_id',
      onDelete:'cascade',
      hooks:true
    })
  };
  return Tasks;
};