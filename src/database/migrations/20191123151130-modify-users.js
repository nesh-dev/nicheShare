module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.changeColumn('Users', 'name',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    queryInterface.changeColumn('Users', 'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
      })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.changeColumn('Users', 'name',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    queryInterface.changeColumn('Users', 'email',
      {
        type: Sequelize.STRING,
        allowNull: true,
      })
  )
};
