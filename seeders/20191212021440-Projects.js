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
      {name:"Train Luke",description:"We need to train luke on the ways of the jedi",status:true,team_id:1,createdAt: new Date(), updatedAt: new Date()},
      {name:"Defeat Darth Vader",description:"The jedi need to defeat darth vader",status:false,team_id:1,createdAt: new Date(), updatedAt: new Date()},
      {name:"Convert anakin",description:"Convert anakin skywalker to the dark side",status:true,team_id:2,createdAt: new Date(), updatedAt: new Date()},
      {name:"Conquer the galaxy",description:"Conquer the entire galaxy",status:false,team_id:2,createdAt: new Date(), updatedAt: new Date()},
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
