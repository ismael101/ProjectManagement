'use strict';
const bcrypt = require('bcrypt')
var saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
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
   return queryInterface.bulkInsert('Users',[
     {username:'luke',password:bcrypt.hashSync('password101',salt), team_id: 1 ,createdAt: new Date(), updatedAt: new Date()},
     {username:'obiwan', password:bcrypt.hashSync('password102',salt), team_id: 1 ,createdAt: new Date(), updatedAt: new Date()},
     {username:'vader', password:bcrypt.hashSync('password103',salt), team_id:2 ,createdAt: new Date(), updatedAt: new Date()},
     {username:'sidious', password:bcrypt.hashSync('password104',salt), team_id:2, createdAt: new Date(), updatedAt: new Date()}
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
   return queryInterface.bulkDelete('Users', null, {})
  }
};
