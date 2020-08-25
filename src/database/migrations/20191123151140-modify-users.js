module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('Users', 'salt',
      {
        type: Sequelize.STRING,
        allowNull: true,
      })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.deleteColumn('Users', 'name', {})
  )
};
