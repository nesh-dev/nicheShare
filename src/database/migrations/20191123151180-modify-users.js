module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'googleId',
      {
        type: Sequelize.STRING,
        allowNull: true,
      });
    await queryInterface.addColumn('Users', 'googleAccessToken',
      {
        type: Sequelize.STRING,
        allowNull: true,
      });
    await queryInterface.addColumn('Users', 'facebookAccessToken',
      {
        type: Sequelize.STRING,
        allowNull: true,
      });
    await queryInterface.addColumn('Users', 'facebookId',
      {
        type: Sequelize.STRING,
        allowNull: true,
      });
    await queryInterface.addColumn('Users', 'profileAvatar',
      {
        type: Sequelize.STRING,
        allowNull: true,
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'googleId', {});
    await queryInterface.removeColumn('Users', 'googleAccessToken', {});
    await queryInterface.removeColumn('Users', 'facebookAccessToken', {});
    await queryInterface.removeColumn('Users', 'facebookId', {});
    await queryInterface.removeColumn('Users', 'profileAvatar', {});
  }
};
