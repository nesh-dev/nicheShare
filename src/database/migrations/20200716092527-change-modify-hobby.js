module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('Hobbies', 'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
        paranoid: true
      })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.deleteColumn('Hobbies', 'deletedAt',
      {}))
};
