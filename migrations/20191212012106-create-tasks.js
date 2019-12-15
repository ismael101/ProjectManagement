'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      projectid: {
        allowNull:false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        noUpdate:true,
        hooks:true,
        references: {
          model: 'Projects',
          key: 'id',
          as: 'projectid'
        }
      },
      assigned: {
        type: Sequelize.STRING,
        onDelete: 'SET NULL',
        hooks:true,
        references: {
          model: 'Users',
          key: 'username',
          as: 'assigned'
        }
      },
      teamid:{
        allowNull:false,
        type:Sequelize.INTEGER,
        onDelete: 'CASCADE',
        noUpdate:true,
        hooks:true,
        references:{
          model:'Teams',
          key:'id',
          as:'teamid'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};