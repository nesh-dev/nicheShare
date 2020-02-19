
module.exports = (sequelize, DataTypes) => {
  const HobbyPosts = sequelize.define('HobbyPosts', {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    isDeleted: { type: DataTypes.BOOLEAN },
    userId: {
      type: DataTypes.INTEGER,
    },
  }, {});
  HobbyPosts.associate = function (models) {
    // associations can be defined here
    HobbyPosts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      targetKey: 'id'
    });

    HobbyPosts.belongsTo(models.Hobby, {
      foreignKey: 'hobbyId',
      as: 'hobby',
      targetKey: 'id'
    });
  };
  return HobbyPosts;
};
