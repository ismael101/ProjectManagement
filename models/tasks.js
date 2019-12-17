'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [5, 100]
      }
    },
    description:{
      type:DataTypes.TEXT,
      validate: {
        len: [5, 100]
      }
    },
    completed:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {});
  Tasks.associate = function(models) {
    // associations can be defined here
    Tasks.belongsTo(models.Projects,{
      foreignKey: 'projectid',
      onDelete: 'CASCADE',
      hooks:true,
    })
    Tasks.belongsTo(models.Teams,{
      foreignKey: 'team',
        onDelete: 'CASCADE',
        hooks:true  
    })
  };
  return Tasks;
};