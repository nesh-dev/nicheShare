module.exports = {
  up: (queryInterface, Sequelize) => (
        
    queryInterface.changeColumn('HobbyPosts', 'slug',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.changeColumn('HobbyPosts', 'HobbyPosts',
      {
        type: Sequelize.STRING,
        allowNull: true,
      })
  )
};
