module.exports = {
  up: (queryInterface, Sequelize) => (
            
    queryInterface.addColumn('HobbyPosts', 'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.removeColumn('HobbyPosts', 'userId',
      {
        
      })
  )
};
