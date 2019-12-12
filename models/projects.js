'use strict';
module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    name: {
      type:DataTypes.STRING,
      allowNull:false, 
    },
    description: DataTypes.STRING,
    status:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {});
  Projects.associate = function(models) {
    // associations can be defined here
   Projects.belongsTo(models.Teams,{
    foreignKey: 'team_id',
      onDelete: 'cascade',
      hooks:true  
  })
  };
  return Projects;
};