
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.addColumn('Hobbies', 'bannerImage', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Hobbies', 'profileImage', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.removeColumn('Hobbies', 'bannerImage', {});
    await queryInterface.removeColumn('Hobbies', 'profileImage', {});
  }
};
