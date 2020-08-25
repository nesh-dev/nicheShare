module.exports = {
  up: (queryInterface, Sequelize) => (
        
    queryInterface.changeColumn('Users', 'googleId',
      {
        type: Sequelize.STRING,
        allowNull: true,
      })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.changeColumn('Users', 'googleId',
      {
        type: Sequelize.Boolean,
        allowNull: true,
      })
  )
};
