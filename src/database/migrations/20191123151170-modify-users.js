module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('Users', 'isActive',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.deleteColumn('Users', 'isActive', {})
  )
};
