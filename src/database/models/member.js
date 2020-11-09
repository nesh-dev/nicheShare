
module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define('member', {
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    
    },

    hobbyId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    isDeleted: {
      type: DataTypes.BOOLEAN
    }

  }, {});
  member.associate = function (models) {
    // associations can be defined here
    member.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });

    member.belongsTo(models.Hobby, {
      foreignKey: 'hobbyId',
      as: 'hobby',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return member;
};
