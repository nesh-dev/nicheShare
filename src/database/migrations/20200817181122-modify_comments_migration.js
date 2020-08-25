
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('comments', 'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      });

    await queryInterface.addConstraint('comments', ['userId'], {
      type: 'foreign key',
      name: 'userId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('comments', ['parent'], {
      type: 'foreign key',
      name: 'parent',
      references: {
        table: 'comments',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
      
    await queryInterface.addColumn('comments', 'reply',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
      });
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('comments', 'userId', {});
    await queryInterface.removeColumn('comments', 'parent', {});
    await queryInterface.removeColumn('comments', 'reply', {});
  }
};
