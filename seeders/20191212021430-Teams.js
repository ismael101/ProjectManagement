'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   //seed the database with this dummy data
   return queryInterface.bulkInsert('Teams',[
     {name:'jedi', createdAt: new Date(), updatedAt: new Date()},
     {name:'sith', createdAt: new Date(), updatedAt: new Date()}
   ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   //unseed
   return queryInterface.bulkDelete('Teams', null, {})
  }
};
