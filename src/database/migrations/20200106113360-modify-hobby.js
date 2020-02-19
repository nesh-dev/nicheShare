module.exports = {
  up: (queryInterface, Sequelize) => (
            
    queryInterface.addColumn('Hobbies', 'isDeleted',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
        
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.removeColumn('Hobbies', 'isDeleted',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
  )
};
