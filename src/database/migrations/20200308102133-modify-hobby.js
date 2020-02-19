module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Hobbies', 'description',
      {
        type: Sequelize.STRING,
        allowNull: true,
      });
    await queryInterface.addColumn('Hobbies', 'image',
      {
        type: Sequelize.STRING,
        allowNull: true,
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Hobbies', 'description', {});
    await queryInterface.removeColumn('Hobbies', 'image', {});
  }
};
