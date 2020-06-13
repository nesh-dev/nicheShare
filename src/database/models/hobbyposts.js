import slugify from 'slugify';

module.exports = (sequelize, DataTypes) => {
  const HobbyPosts = sequelize.define('HobbyPosts', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      unique: {
        args: true,
        msg: 'This title already exists'
      }
    },
    slug: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      unique: {
        args: true,
        msg: 'This title already exists'
      }
    },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    isDeleted: { type: DataTypes.BOOLEAN },
    
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
  });


  const setSlug = (post) => {
    post.set('slug', slugify(post.get('title')));
  };

  HobbyPosts.beforeCreate(setSlug);

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
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return HobbyPosts;
};
