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
     {username:'luke',password:bcrypt.hashSync('password101',salt), teamname: 'jedi',role:'jedi padawan',profilepic:'http://localhost:5000/images/luke.png',createdAt: new Date(), updatedAt: new Date()},
     {username:'obiwan', password:bcrypt.hashSync('password102',salt), teamname: 'jedi',role:'jedi master',profilepic:'http://localhost:5000/images/obiwan.png' ,createdAt: new Date(), updatedAt: new Date()},
     {username:'vader', password:bcrypt.hashSync('password103',salt), teamname:'sith',role:'sith lord',profilepic:'http://localhost:5000/images/vader.png' ,createdAt: new Date(), updatedAt: new Date()},
     {username:'maul', password:bcrypt.hashSync('password104',salt), teamname:'sith',role:'sith lord',profilepic:'http://localhost:5000/images/vader.png',createdAt: new Date(), updatedAt: new Date()}
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
