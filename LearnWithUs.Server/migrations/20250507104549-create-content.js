'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Content', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('NEWID()'),
        primaryKey: true
      },
      path: {
        type: Sequelize.STRING(2048),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(1000),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      mimeType: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: true
      },      
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'User', // name of the target table
          key: 'id',      // key in the target table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Category', // name of the target table
          key: 'id',      // key in the target table
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
    });   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Content');
  }
};
