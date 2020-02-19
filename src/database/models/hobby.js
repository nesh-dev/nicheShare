
module.exports = (sequelize, DataTypes) => {
  const Hobby = sequelize.define('Hobby', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      unique: {
        args: true,
        msg: 'This hobby already exists'
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false
      }
    },
    image: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true
      }
    }
    
  }, {});
  Hobby.associate = (models) => {
    // associations can be defined here
    Hobby.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      targetKey: 'id'
    });

    Hobby.hasMany(models.HobbyPosts, {
      foreignKey: 'id',
      as: 'posts'
    });
  };
  return Hobby;
};
