import slugify from 'slugify';

module.exports = (sequelize, DataTypes) => {
  const HobbyPosts = sequelize.define('HobbyPosts', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
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

  const checkIfSlugExists = async (post) => {
    const { title } = post;
    const checkPost = await HobbyPosts.findOne({
      where: {
        slug: title, isDeleted: false
      }
    });
    if (checkPost) { return true; } return false;
  };

  const genCharArray = (charA, charZ) => {
    const a = []; let i = charA.charCodeAt(0); const
      j = charZ.charCodeAt(0);
    for (; i <= j; i += 1) {
      a.push(String.fromCharCode(i));
    }
    return a;
  };


  const addExtension = () => {
    const Alphabet = genCharArray('a', 'z');
    const emptyArray = [];
    for (let i = 0; i < 5; i += 1) {
      const randomNum = Math.floor(Math.random(1, 22) * 10);
      emptyArray.push(Alphabet[randomNum]);
    }
    const postFix = emptyArray.join('');
    return postFix;
  };

  const modifySlug = (post) => {
    const status = checkIfSlugExists(post);
    const title = post.get('title');
    if (status) {
      const extension = addExtension();
      return title.concat('-', extension);
    }
    return title;
  };


  const setSlug = (post) => {
    const slug = modifySlug(post);
    post.set('slug', slugify(slug));
  };

  HobbyPosts.beforeCreate(setSlug);

  HobbyPosts.associate = function (models) {
    // associations can be defined here
    HobbyPosts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
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
