'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'superadmin@nomail.com',
          role: "Admin",
          password: "$2b$10$BnSP5uCQ4hMXmO3.787peeqOMlVVO7poPpfHZEY9Ec.GlRUTBYkG6",
          firstName: "Super",
          lastName: "Admin",
        },
        {
          username: 'user@nomail.com',
          role: "User",
          password: "$2b$10$BnSP5uCQ4hMXmO3.787peeqOMlVVO7poPpfHZEY9Ec.GlRUTBYkG6",
          firstName: "John",
          lastName: "Doe",
        },
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
