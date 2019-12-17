'use strict';
module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
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
  Projects.associate = function(models) {
    // associations can be defined here
   Projects.belongsTo(models.Teams,{
    foreignKey: 'team',
      onDelete: 'CASCADE',
      hooks:true  
  })
  };
  return Projects;
};