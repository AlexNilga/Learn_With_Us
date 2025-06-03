'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Fetch the user IDs from the database (assuming there are already users)
    //const users = await queryInterface.sequelize.query('SELECT id FROM Users', { type: Sequelize.QueryTypes.SELECT });
    //const userId = users[0].id; // Taking the first user as an example

    await queryInterface.bulkInsert(
      'Category',
      [
        {
          name: 'Math',
          description: "content related to math",
          userId: 1, // Associate with super admin,
          createdAt: new Date(),
        },
        {
          name: 'Algebra',
          description: "content related to algebra",
          userId: 1, // Associate with super admin
          parentId: 1, // Associate with parent category
          createdAt: new Date(),
        },
        {
          name: 'Geometry',
          description: "content related to geometry",
          userId: 1, // Associate with super admin
          parentId: 1, // Associate with parent category
          createdAt: new Date(),
        },
        {
          name: 'Psychology',
          description: "content related to psychology",
          userId: 1, // Associate with super admin
          createdAt: new Date(),
        }
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
