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
    return queryInterface.bulkInsert('Projects',[
      {name:"Train Luke",description:"We need to train luke on the ways of the jedi",completed:true,team:'jedi',createdAt: new Date(), updatedAt: new Date()},
      {name:"Defeat Darth Vader",description:"The jedi need to defeat darth vader",completed:false,team:'jedi',createdAt: new Date(), updatedAt: new Date()},
      {name:"Convert anakin",description:"Convert anakin skywalker to the dark side",completed:true,team:'sith',createdAt: new Date(), updatedAt: new Date()},
      {name:"Conquer the galaxy",description:"Conquer the entire galaxy",completed:false,team:'sith',createdAt: new Date(), updatedAt: new Date()},
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
   return queryInterface.bulkDelete('Projects', null, {})
  }
};
