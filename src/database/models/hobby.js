
module.exports = (sequelize, DataTypes) => {
  const Hobby = sequelize.define('Hobby', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    }
  }, {});
  Hobby.associate = (models) => {
    // associations can be defined here
    Hobby.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      targetKey: 'id'
    });
  };
  return Hobby;
};
