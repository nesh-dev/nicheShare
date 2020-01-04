module.exports = {
  up: (queryInterface, Sequelize) => (
          
    queryInterface.addColumn('Hobbies', 'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.addColumn('Hobbies', 'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      })
  )
};
