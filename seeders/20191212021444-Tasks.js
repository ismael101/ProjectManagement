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
   return queryInterface.bulkInsert('Tasks',[
     {name:'Force Training',description:'Train on how to use the force',status:true,user_id:1,project_id:1,team_id:1,createdAt: new Date(), updatedAt: new Date()},
     {name:'Lightsaber training',description:'Teach luke skywalker how to use a lightsaber',status:true,user_id:2,project_id:1,team_id:1,createdAt: new Date(), updatedAt: new Date()},

     {name:'Go to Cloud City',description:'Go to cloud city to confront darth vader',status:false,user_id:1,project_id:2,team_id:1,createdAt: new Date(), updatedAt: new Date()},
     {name:'Find out a secret',description:'Find out the secret of who your dad is',status:false,user_id:1,project_id:2,team_id:1,createdAt: new Date(), updatedAt: new Date()},

     {name:'Befriend Anakin',description:'Befriend anakin and slowly pull him in to the dark side',status:true,user_id:4,project_id:3,team_id:2,createdAt: new Date(), updatedAt: new Date()},
     {name:'Fight with obiwan',description:'Fight with obiwan kenobe on lava planet',status:true,user_id:3,project_id:3,team_id:2,createdAt: new Date(), updatedAt: new Date()},

     {name:'Capture Leia',description:'capture princess leia',status:false,user_id:3,project_id:4,team_id:2,createdAt: new Date(), updatedAt: new Date()},
     {name:'Destroy Alderaan',description:'Use the death star to destroy the planet alderaan',status:false,user_id:4,project_id:4, team_id:2,createdAt: new Date(), updatedAt: new Date()},
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
   return queryInterface.bulkDelete('Tasks', null, {})
  }
};
