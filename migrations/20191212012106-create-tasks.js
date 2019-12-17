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
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.TEXT
      },
      completed: {
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
      team: {
        allowNull:false,
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        hooks:true,
        noUpdate:true,
        references: {
          model: 'Teams',
          key: 'name',
          as: 'team'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};