
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    hobbyPostId: DataTypes.NUMBER,
    text: DataTypes.STRING
  }, {});
  comments.associate = function (models) {
    // associations can be defined here
  };
  return comments;
};
