
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {

    hobbyPostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'comment message is required',
        },
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    parent: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    reply: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }

  }, {});
  Comments.associate = (models) => {
    // associations can be defined here
    Comments.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });

    Comments.belongsTo(models.HobbyPosts, {
      foreignKey: 'hobbyPostId',
      as: 'hobbyPost',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });

    Comments.belongsTo(models.Comments, {
      foreignKey: 'parent',
      as: 'parentReply',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };
  return Comments;
};
