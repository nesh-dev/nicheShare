'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    await queryInterface.addConstraint('Hobbies', ['userId'], {
      type: 'foreign key',
      name: 'userId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });


    await queryInterface.addConstraint('HobbyPosts', ['userId'], {
      type: 'foreign key',
      name: 'userId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('HobbyPosts', ['hobbyId'], {
      type: 'foreign key',
      name: 'hobbyId',
      references: {
        table: 'Hobbies',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });


  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    await queryInterface.removeColumn('Hobbies', 'userId', {});
    await queryInterface.removeColumn('HobbyPosts', 'userId', {});
    await queryInterface.removeColumn('HobbyPosts', 'hobbyId', {});

  }
};
