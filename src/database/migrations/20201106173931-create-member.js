
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('members', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    hobbyId: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    isDeleted: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('members')
};
