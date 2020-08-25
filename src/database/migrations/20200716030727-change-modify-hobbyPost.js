module.exports = {
  up: (queryInterface, Sequelize) => (
          
    queryInterface.changeColumn('HobbyPosts', 'hobbyId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Hobby',
          key: 'id',
        },
        onDelete: 'CASCADE',
      })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.changeColumn('HobbyPosts', 'hobbyId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      })
  )
};
