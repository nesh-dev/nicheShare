module.exports = {
  up: (queryInterface, Sequelize) => (
      
    queryInterface.changeColumn('Users', 'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
      })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.changeColumn('Users', 'email',
      {
        type: Sequelize.STRING,
        allowNull: true,
        isEmail: false,
        unique: false
      })
  )
};
