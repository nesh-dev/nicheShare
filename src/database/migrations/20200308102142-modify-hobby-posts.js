module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('HobbyPosts', 'hobbyId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
    
    await queryInterface.changeColumn('HobbyPosts', 'isDeleted', {

      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.addColumn('HobbyPosts', 'slug', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('HobbyPosts', 'hobbyId',
      {
         
      });
    await queryInterface.changeColumn('HobbyPosts', 'isDeleted',
      { type: Sequelize.BOOLEAN });

    await queryInterface.removeColumn('HobbyPosts', 'slug', {
        
    });
  }
};
